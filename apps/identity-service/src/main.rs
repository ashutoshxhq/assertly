pub mod app;
pub mod middlewares;
pub mod models;
pub mod modules;
pub mod router;
pub mod schema;
pub mod service;
pub mod types;

use std::{env, time::Duration};

use axum::{error_handling::HandleErrorLayer, http::StatusCode, BoxError, Extension, Router};
use dotenvy::dotenv;
use tower::ServiceBuilder;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::Level;
use tracing_subscriber::{fmt::format::FmtSpan, FmtSubscriber};

use crate::{app::AppState, router::application_router};

#[tokio::main]
async fn main() {
    dotenv().ok();
    let subscriber_builder = FmtSubscriber::builder()
        .with_max_level(Level::DEBUG)
        .with_level(true)
        .with_line_number(true)
        .with_file(true)
        .with_thread_ids(true)
        .with_span_events(FmtSpan::CLOSE);

    if env::var("APP_ENVIRONMENT")
        .unwrap_or("prod".to_string())
        .parse::<String>()
        .unwrap()
        == "dev"
    {
        tracing::subscriber::set_global_default(
            subscriber_builder.compact().with_ansi(true).finish(),
        )
        .expect("setting dev subscriber failed");
    } else {
        tracing::subscriber::set_global_default(
            subscriber_builder.json().with_ansi(false).finish(),
        )
        .expect("setting prod subscriber failed");
    }
    let state = AppState::new();
    let app = Router::new().merge(application_router()).layer(
        ServiceBuilder::new()
            .layer(HandleErrorLayer::new(|error: BoxError| async move {
                if error.is::<tower::timeout::error::Elapsed>() {
                    Ok(StatusCode::REQUEST_TIMEOUT)
                } else {
                    Err((
                        StatusCode::INTERNAL_SERVER_ERROR,
                        format!("Unhandled internal error: {}", error),
                    ))
                }
            }))
            .timeout(Duration::from_secs(10))
            .layer(TraceLayer::new_for_http())
            .layer(Extension(state))
            .layer(
                CorsLayer::new()
                    .allow_origin(tower_http::cors::Any)
                    .allow_methods(tower_http::cors::Any)
                    .allow_headers(tower_http::cors::Any),
            )
            .into_inner(),
    );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:5003")
        .await
        .expect("unable to create listner");

    tracing::info!("Server started, listening on port 8000");
    axum::serve(listener, app)
        .await
        .expect("unable to start srver");
}

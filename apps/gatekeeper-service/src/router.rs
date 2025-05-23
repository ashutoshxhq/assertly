use axum::{routing::any, Extension, Router};
use tower_http::{cors::CorsLayer, trace::TraceLayer};

use crate::{
    health::health,
    proxy_handler::{Client, GatekeeperProxyHandler},
    service::GatekeeperService,
};

pub fn proxy_router(client: Client, service: GatekeeperService) -> Router {
    Router::new()
        // Protected Routes go here
        .route(
            "/:service/:version/*path",
            any(GatekeeperProxyHandler::handle),
        )
        // .route_layer(axum_middleware::from_fn(auth))
        // Public Routes go here
        .route(
            "/:service/:version/health",
            any(GatekeeperProxyHandler::handle),
        )
        .route("/gatekeeper/v1/health", any(health))
        .route(
            "/identity/:version/authn/register",
            any(GatekeeperProxyHandler::handle),
        )
        .route(
            "/identity/:version/authn/login",
            any(GatekeeperProxyHandler::handle),
        )
        .route(
            "/identity/:version/authn/token",
            any(GatekeeperProxyHandler::handle),
        )
        .with_state(client)
        .layer(TraceLayer::new_for_http())
        .layer(
            CorsLayer::new()
                .allow_origin(tower_http::cors::Any)
                .allow_methods(tower_http::cors::Any)
                .allow_headers(tower_http::cors::Any),
        )
        .layer(Extension(service))
}

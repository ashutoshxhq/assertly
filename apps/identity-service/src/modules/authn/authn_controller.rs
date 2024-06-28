use axum::{http::StatusCode, response::IntoResponse, Extension, Json};
use serde_json::json;

use crate::{
    app::AppState,
    types::auth::{LoginRequest, RefreshTokenRequest, RegisterRequest},
};

pub async fn register(
    Extension(app): Extension<AppState>,
    Json(data): Json<RegisterRequest>,
) -> impl IntoResponse {
    let res = app.service.authn.register(data).await;
    match res {
        Ok(res) => (StatusCode::OK, Json(res)),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "message": err.to_string()
            })),
        ),
    }
}

pub async fn login(
    Extension(app): Extension<AppState>,
    Json(data): Json<LoginRequest>,
) -> impl IntoResponse {
    let res = app.service.authn.login(data).await;
    match res {
        Ok(res) => (StatusCode::OK, Json(res)),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "message": err.to_string()
            })),
        ),
    }
}

pub async fn refresh_token(
    Extension(app): Extension<AppState>,
    Json(data): Json<RefreshTokenRequest>,
) -> impl IntoResponse {
    let res = app.service.authn.refresh_token(data).await;
    match res {
        Ok(res) => (StatusCode::OK, Json(res)),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "message": err.to_string()
            })),
        ),
    }
}
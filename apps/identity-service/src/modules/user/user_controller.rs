use axum::{
    extract::{Path, Query},
    http::StatusCode,
    response::IntoResponse,
    Extension, Json,
};
use bcrypt::{hash, DEFAULT_COST};
use serde_json::json;
use std::str::FromStr;
use uuid::Uuid;

use crate::{
    app::AppState,
    models::user::{CreateUser, UpdateUser},
    types::{
        auth::Claims, InviteUser, PaginationWithSearchQueryParam
    },
};

pub async fn get_user(
    Extension(app): Extension<AppState>,
    Path((_team_id, user_id)): Path<(String, String)>,
) -> impl IntoResponse {
    let user_id = Uuid::from_str(&user_id);
    match user_id {
        Ok(user_id) => {
            let res = app.service.user.get_user(user_id).await;

            match res {
                Ok(res) => (
                    StatusCode::OK,
                    Json(json!({
                        "status": "ok",
                        "data": res,
                    })),
                ),
                Err(err) => (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(json!({
                        "status": "error",
                        "error": err.to_string()
                    })),
                ),
            }
        }
        Err(_err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "error": "bad user id in url",
            })),
        ),
    }
}

pub async fn get_users(
    Extension(app): Extension<AppState>,
    Extension(claims): Extension<Claims>,
    query: Query<PaginationWithSearchQueryParam>,
) -> impl IntoResponse {
    let res = app.service.user.get_users(
        claims.team_id,
        query.query.clone(),
        query.offset,
        query.limit,
    );
    match res {
        Ok(res) => (
            StatusCode::OK,
            Json(json!({
                "status": "ok",
                "data": res,
            })),
        ),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "error": err.to_string()
            })),
        ),
    }
}

pub async fn invite_user(
    Extension(app): Extension<AppState>,
    Extension(claims): Extension<Claims>,
    Json(data): Json<InviteUser>,
) -> impl IntoResponse {
    let res = app
        .service
        .user
        .create_user(CreateUser {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: hash(data.password, DEFAULT_COST).unwrap(),
            role: data.role,
            team_id: claims.team_id,
        })
        .await;

    match res {
        Ok(_res) => (
            StatusCode::OK,
            Json(json!({
                "status": "ok",
                "data": "user invited successfully",
            })),
        ),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "error": err.to_string()
            })),
        ),
    }
}

pub async fn update_user(
    Extension(app): Extension<AppState>,
    Path((_team_id, user_id)): Path<(String, String)>,
    Json(data): Json<UpdateUser>,
) -> impl IntoResponse {
    let user_id = Uuid::from_str(&user_id);
    match user_id {
        Ok(user_id) => {
            let res = app.service.user.update_user(user_id, data).await;

            match res {
                Ok(_res) => (
                    StatusCode::OK,
                    Json(json!({
                        "status": "ok",
                        "data": "user updated successfully",
                    })),
                ),
                Err(err) => (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(json!({
                        "status": "error",
                        "error": err.to_string()
                    })),
                ),
            }
        }
        Err(_err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "error": "bad user id in url",
            })),
        ),
    }
}

pub async fn delete_user(
    Extension(app): Extension<AppState>,
    Path((_team_id, user_id)): Path<(String, String)>,
) -> impl IntoResponse {
    let user_id = Uuid::from_str(&user_id);
    match user_id {
        Ok(user_id) => {
            let res = app.service.user.delete_user(user_id).await;

            match res {
                Ok(_res) => (
                    StatusCode::OK,
                    Json(json!({
                        "status": "ok",
                        "data": "user deleted successfully",
                    })),
                ),
                Err(err) => (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(json!({
                        "status": "error",
                        "error": err.to_string()
                    })),
                ),
            }
        }
        Err(_err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "status": "error",
                "error": "bad user id in url",
            })),
        ),
    }
}
use axum::{
    middleware,
    routing::{delete, get, patch, post},
    Router,
};

use crate::{middlewares::authorize::authorize, modules::{authn::authn_controller, health::health_controller, team::team_controller, user::user_controller}};

pub fn application_router() -> Router {
    Router::new()
        // Team Routes
        .route(
            "/v1/teams/:team_id",
            get(team_controller::get_team),
        )
        .route(
            "/v1/teams/:team_id",
            patch(team_controller::update_team),
        )
        .route(
            "/v1/teams/:team_id",
            delete(team_controller::delete_team),
        )
        // User Routes
        .route(
            "/v1/teams/:team_id/users/:id",
            get(user_controller::get_user),
        )
        .route(
            "/v1/teams/:team_id/users",
            get(user_controller::get_users),
        )
        .route(
            "/v1/teams/:team_id/users",
            post(user_controller::invite_user),
        )
        .route(
            "/v1/teams/:team_id/users/:id",
            patch(user_controller::update_user),
        )
        .route(
            "/v1/teams/:team_id/users/:id",
            delete(user_controller::delete_user),
        )
        .route_layer(middleware::from_fn(authorize))
        // Authn Controller
        .route(
            "/v1/authn/register",
            post(authn_controller::register),
        )
        .route(
            "/v1/authn/login",
            post(authn_controller::login),
        )
        .route(
            "/v1/authn/token",
            post(authn_controller::refresh_token),
        )
        .route("/v1/health", get(health_controller::health))
}
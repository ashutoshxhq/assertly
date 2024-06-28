use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    pub aud: String,
    pub exp: i64,
    pub iat: i64,
    pub iss: String,
    pub sub: String,
    pub user_id: Uuid,
    pub team_id: Uuid,
    pub role: String,
}

#[derive(Deserialize, Serialize)]
pub struct RegisterRequest {
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginRequest {
    pub identifier: String,
    pub password: String,
}

#[derive(Deserialize, Serialize)]
pub struct RefreshTokenRequest {
    pub refresh_token: String,
}
use serde::{Deserialize, Serialize};

pub mod auth;
pub mod db;
pub mod error;
pub mod token;

#[derive(Deserialize)]
pub struct PaginationWithSearchQueryParam {
    pub query: Option<String>,
    pub offset: Option<i64>,
    pub limit: Option<i64>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InviteUser {
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
    pub role: String,
}

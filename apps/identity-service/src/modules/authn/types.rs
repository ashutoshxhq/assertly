use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterWebhookRequest {
    pub idp_user_id: String,
    pub email: String,
    pub connection: String,
    pub username: String,
    pub firstname: Option<String>,
    pub lastname: Option<String>,
}

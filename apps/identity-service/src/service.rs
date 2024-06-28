use crate::{
    modules::{
        authn::authn_service::AuthNService, team::team_service::TeamService,
        user::user_service::UserService,
    },
    types::db::DbPool,
};

#[derive(Clone)]
pub struct AppService {
    pub team: TeamService,
    pub user: UserService,
    pub authn: AuthNService,
}

impl AppService {
    pub fn new(pool: DbPool) -> Self {
        Self {
            team: TeamService::new(pool.clone()),
            user: UserService::new(pool.clone()),
            authn: AuthNService::new(pool),
        }
    }
}

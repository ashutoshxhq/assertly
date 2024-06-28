use diesel::{
    r2d2::{self, ConnectionManager},
    PgConnection,
};
use crate::service::AppService;

#[derive(Clone)]
pub struct AppState {
    pub service: AppService,
}
impl AppState {
    pub fn new() -> Self {
        let manager = ConnectionManager::<PgConnection>::new(
            std::env::var("DATABASE_URL").expect("Unable to get database url"),
        );
        let pool = r2d2::Pool::builder()
            .max_size(10)
            .min_idle(Some(1))
            .test_on_check_out(true)
            .build(manager)
            .unwrap();


        Self {
            service: AppService::new(pool),
        }
    }
}

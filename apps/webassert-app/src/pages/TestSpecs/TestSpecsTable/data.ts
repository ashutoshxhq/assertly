export type TestSpec = {
    id: string
    name: string
    pipeline: object[]
    status: "idle" | "running" | "success" | "failed"
    createdAt: string
    lastRanAt: string
    updatedAt: string
}


export const specs: TestSpec[] = [
    {
        "id": "test001",
        "name": "Integration Test Suite",
        "pipeline": [
            { "step": "Setup", "command": "npm install" },
            { "step": "Run Tests", "command": "npm test" }
        ],
        "status": "idle",
        "createdAt": "2024-06-28T10:30:00Z",
        "lastRanAt": "2024-06-27T15:45:30Z",
        "updatedAt": "2024-06-28T11:00:00Z"
    },
    {
        "id": "test002",
        "name": "Unit Test Suite",
        "pipeline": [
            { "step": "Lint", "command": "npm run lint" },
            { "step": "Test", "command": "npm run test:unit" }
        ],
        "status": "running",
        "createdAt": "2024-06-27T09:15:00Z",
        "lastRanAt": "2024-06-28T08:30:00Z",
        "updatedAt": "2024-06-28T08:30:05Z"
    },
    {
        "id": "test003",
        "name": "Performance Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d" },
            { "step": "Run", "command": "k6 run performance.js" },
            { "step": "Cleanup", "command": "docker-compose down" }
        ],
        "status": "success",
        "createdAt": "2024-06-26T14:00:00Z",
        "lastRanAt": "2024-06-28T01:00:00Z",
        "updatedAt": "2024-06-28T01:30:00Z"
    },
    {
        "id": "test004",
        "name": "API Test Suite",
        "pipeline": [
            { "step": "Run", "command": "newman run api_collection.json" }
        ],
        "status": "failed",
        "createdAt": "2024-06-25T11:30:00Z",
        "lastRanAt": "2024-06-28T07:00:00Z",
        "updatedAt": "2024-06-28T07:15:00Z"
    },
    {
        "id": "test005",
        "name": "Security Scan",
        "pipeline": [
            { "step": "Scan", "command": "npm audit" },
            { "step": "Report", "command": "generate-report.sh" }
        ],
        "status": "idle",
        "createdAt": "2024-06-24T16:45:00Z",
        "lastRanAt": "2024-06-27T16:45:00Z",
        "updatedAt": "2024-06-27T17:00:00Z"
    },
    {
        "id": "test006",
        "name": "End-to-End Test",
        "pipeline": [
            { "step": "Setup", "command": "npm run setup:e2e" },
            { "step": "Run", "command": "npm run test:e2e" },
            { "step": "Teardown", "command": "npm run teardown:e2e" }
        ],
        "status": "running",
        "createdAt": "2024-06-23T13:20:00Z",
        "lastRanAt": "2024-06-28T09:00:00Z",
        "updatedAt": "2024-06-28T09:05:00Z"
    },
    {
        "id": "test007",
        "name": "Accessibility Test",
        "pipeline": [
            { "step": "Run", "command": "pa11y-ci" }
        ],
        "status": "idle",
        "createdAt": "2024-06-22T10:10:00Z",
        "lastRanAt": "2024-06-26T10:10:00Z",
        "updatedAt": "2024-06-26T10:25:00Z"
    },
    {
        "id": "test008",
        "name": "Database Migration Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d db" },
            { "step": "Migrate", "command": "npm run db:migrate" },
            { "step": "Test", "command": "npm run test:db" },
            { "step": "Rollback", "command": "npm run db:rollback" }
        ],
        "status": "success",
        "createdAt": "2024-06-21T15:30:00Z",
        "lastRanAt": "2024-06-28T03:00:00Z",
        "updatedAt": "2024-06-28T03:30:00Z"
    },
    {
        "id": "test009",
        "name": "Load Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d" },
            { "step": "Run", "command": "artillery run load_test.yml" },
            { "step": "Cleanup", "command": "docker-compose down" }
        ],
        "status": "idle",
        "createdAt": "2024-06-20T11:45:00Z",
        "lastRanAt": "2024-06-25T11:45:00Z",
        "updatedAt": "2024-06-25T12:30:00Z"
    },
    {
        "id": "test010",
        "name": "Smoke Test",
        "pipeline": [
            { "step": "Run", "command": "npm run test:smoke" }
        ],
        "status": "success",
        "createdAt": "2024-06-19T09:00:00Z",
        "lastRanAt": "2024-06-28T06:00:00Z",
        "updatedAt": "2024-06-28T06:05:00Z"
    },
    {
        "id": "test001",
        "name": "Integration Test Suite",
        "pipeline": [
            { "step": "Setup", "command": "npm install" },
            { "step": "Run Tests", "command": "npm test" }
        ],
        "status": "idle",
        "createdAt": "2024-06-28T10:30:00Z",
        "lastRanAt": "2024-06-27T15:45:30Z",
        "updatedAt": "2024-06-28T11:00:00Z"
    },
    {
        "id": "test002",
        "name": "Unit Test Suite",
        "pipeline": [
            { "step": "Lint", "command": "npm run lint" },
            { "step": "Test", "command": "npm run test:unit" }
        ],
        "status": "running",
        "createdAt": "2024-06-27T09:15:00Z",
        "lastRanAt": "2024-06-28T08:30:00Z",
        "updatedAt": "2024-06-28T08:30:05Z"
    },
    {
        "id": "test003",
        "name": "Performance Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d" },
            { "step": "Run", "command": "k6 run performance.js" },
            { "step": "Cleanup", "command": "docker-compose down" }
        ],
        "status": "success",
        "createdAt": "2024-06-26T14:00:00Z",
        "lastRanAt": "2024-06-28T01:00:00Z",
        "updatedAt": "2024-06-28T01:30:00Z"
    },
    {
        "id": "test004",
        "name": "API Test Suite",
        "pipeline": [
            { "step": "Run", "command": "newman run api_collection.json" }
        ],
        "status": "failed",
        "createdAt": "2024-06-25T11:30:00Z",
        "lastRanAt": "2024-06-28T07:00:00Z",
        "updatedAt": "2024-06-28T07:15:00Z"
    },
    {
        "id": "test005",
        "name": "Security Scan",
        "pipeline": [
            { "step": "Scan", "command": "npm audit" },
            { "step": "Report", "command": "generate-report.sh" }
        ],
        "status": "idle",
        "createdAt": "2024-06-24T16:45:00Z",
        "lastRanAt": "2024-06-27T16:45:00Z",
        "updatedAt": "2024-06-27T17:00:00Z"
    },
    {
        "id": "test006",
        "name": "End-to-End Test",
        "pipeline": [
            { "step": "Setup", "command": "npm run setup:e2e" },
            { "step": "Run", "command": "npm run test:e2e" },
            { "step": "Teardown", "command": "npm run teardown:e2e" }
        ],
        "status": "running",
        "createdAt": "2024-06-23T13:20:00Z",
        "lastRanAt": "2024-06-28T09:00:00Z",
        "updatedAt": "2024-06-28T09:05:00Z"
    },
    {
        "id": "test007",
        "name": "Accessibility Test",
        "pipeline": [
            { "step": "Run", "command": "pa11y-ci" }
        ],
        "status": "idle",
        "createdAt": "2024-06-22T10:10:00Z",
        "lastRanAt": "2024-06-26T10:10:00Z",
        "updatedAt": "2024-06-26T10:25:00Z"
    },
    {
        "id": "test008",
        "name": "Database Migration Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d db" },
            { "step": "Migrate", "command": "npm run db:migrate" },
            { "step": "Test", "command": "npm run test:db" },
            { "step": "Rollback", "command": "npm run db:rollback" }
        ],
        "status": "success",
        "createdAt": "2024-06-21T15:30:00Z",
        "lastRanAt": "2024-06-28T03:00:00Z",
        "updatedAt": "2024-06-28T03:30:00Z"
    },
    {
        "id": "test009",
        "name": "Load Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d" },
            { "step": "Run", "command": "artillery run load_test.yml" },
            { "step": "Cleanup", "command": "docker-compose down" }
        ],
        "status": "idle",
        "createdAt": "2024-06-20T11:45:00Z",
        "lastRanAt": "2024-06-25T11:45:00Z",
        "updatedAt": "2024-06-25T12:30:00Z"
    },
    {
        "id": "test010",
        "name": "Smoke Test",
        "pipeline": [
            { "step": "Run", "command": "npm run test:smoke" }
        ],
        "status": "success",
        "createdAt": "2024-06-19T09:00:00Z",
        "lastRanAt": "2024-06-28T06:00:00Z",
        "updatedAt": "2024-06-28T06:05:00Z"
    },
    {
        "id": "test001",
        "name": "Integration Test Suite",
        "pipeline": [
            { "step": "Setup", "command": "npm install" },
            { "step": "Run Tests", "command": "npm test" }
        ],
        "status": "idle",
        "createdAt": "2024-06-28T10:30:00Z",
        "lastRanAt": "2024-06-27T15:45:30Z",
        "updatedAt": "2024-06-28T11:00:00Z"
    },
    {
        "id": "test002",
        "name": "Unit Test Suite",
        "pipeline": [
            { "step": "Lint", "command": "npm run lint" },
            { "step": "Test", "command": "npm run test:unit" }
        ],
        "status": "running",
        "createdAt": "2024-06-27T09:15:00Z",
        "lastRanAt": "2024-06-28T08:30:00Z",
        "updatedAt": "2024-06-28T08:30:05Z"
    },
    {
        "id": "test003",
        "name": "Performance Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d" },
            { "step": "Run", "command": "k6 run performance.js" },
            { "step": "Cleanup", "command": "docker-compose down" }
        ],
        "status": "success",
        "createdAt": "2024-06-26T14:00:00Z",
        "lastRanAt": "2024-06-28T01:00:00Z",
        "updatedAt": "2024-06-28T01:30:00Z"
    },
    {
        "id": "test004",
        "name": "API Test Suite",
        "pipeline": [
            { "step": "Run", "command": "newman run api_collection.json" }
        ],
        "status": "failed",
        "createdAt": "2024-06-25T11:30:00Z",
        "lastRanAt": "2024-06-28T07:00:00Z",
        "updatedAt": "2024-06-28T07:15:00Z"
    },
    {
        "id": "test005",
        "name": "Security Scan",
        "pipeline": [
            { "step": "Scan", "command": "npm audit" },
            { "step": "Report", "command": "generate-report.sh" }
        ],
        "status": "idle",
        "createdAt": "2024-06-24T16:45:00Z",
        "lastRanAt": "2024-06-27T16:45:00Z",
        "updatedAt": "2024-06-27T17:00:00Z"
    },
    {
        "id": "test006",
        "name": "End-to-End Test",
        "pipeline": [
            { "step": "Setup", "command": "npm run setup:e2e" },
            { "step": "Run", "command": "npm run test:e2e" },
            { "step": "Teardown", "command": "npm run teardown:e2e" }
        ],
        "status": "running",
        "createdAt": "2024-06-23T13:20:00Z",
        "lastRanAt": "2024-06-28T09:00:00Z",
        "updatedAt": "2024-06-28T09:05:00Z"
    },
    {
        "id": "test007",
        "name": "Accessibility Test",
        "pipeline": [
            { "step": "Run", "command": "pa11y-ci" }
        ],
        "status": "idle",
        "createdAt": "2024-06-22T10:10:00Z",
        "lastRanAt": "2024-06-26T10:10:00Z",
        "updatedAt": "2024-06-26T10:25:00Z"
    },
    {
        "id": "test008",
        "name": "Database Migration Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d db" },
            { "step": "Migrate", "command": "npm run db:migrate" },
            { "step": "Test", "command": "npm run test:db" },
            { "step": "Rollback", "command": "npm run db:rollback" }
        ],
        "status": "success",
        "createdAt": "2024-06-21T15:30:00Z",
        "lastRanAt": "2024-06-28T03:00:00Z",
        "updatedAt": "2024-06-28T03:30:00Z"
    },
    {
        "id": "test009",
        "name": "Load Test",
        "pipeline": [
            { "step": "Setup", "command": "docker-compose up -d" },
            { "step": "Run", "command": "artillery run load_test.yml" },
            { "step": "Cleanup", "command": "docker-compose down" }
        ],
        "status": "idle",
        "createdAt": "2024-06-20T11:45:00Z",
        "lastRanAt": "2024-06-25T11:45:00Z",
        "updatedAt": "2024-06-25T12:30:00Z"
    },
    {
        "id": "test010",
        "name": "Smoke Test",
        "pipeline": [
            { "step": "Run", "command": "npm run test:smoke" }
        ],
        "status": "success",
        "createdAt": "2024-06-19T09:00:00Z",
        "lastRanAt": "2024-06-28T06:00:00Z",
        "updatedAt": "2024-06-28T06:05:00Z"
    }
]
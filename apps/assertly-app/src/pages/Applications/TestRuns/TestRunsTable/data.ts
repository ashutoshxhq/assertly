export type TestRun = {
    id: string
    testName: string
    status: "running" | "success" | "failed"
    startTime: string
    endTime: string
    duration: number // in seconds
    result: {
        totalTests: number
        passed: number
        failed: number
        skipped: number
    }
    logs: string
}

export const testRuns: TestRun[] = [
    {
        "id": "run001",
        "testName": "Integration Test Suite",
        "status": "success",
        "startTime": "2024-06-28T10:30:00Z",
        "endTime": "2024-06-28T10:45:30Z",
        "duration": 930,
        "result": {
            "totalTests": 50,
            "passed": 48,
            "failed": 1,
            "skipped": 1
        },
        "logs": "Test run completed successfully. 1 test failed: 'user-auth-test'..."
    },
    {
        "id": "run002",
        "testName": "Unit Test Suite",
        "status": "running",
        "startTime": "2024-06-28T11:00:00Z",
        "endTime": "",
        "duration": 0,
        "result": {
            "totalTests": 0,
            "passed": 0,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Running tests..."
    },
    {
        "id": "run003",
        "testName": "Performance Test",
        "status": "success",
        "startTime": "2024-06-28T01:00:00Z",
        "endTime": "2024-06-28T01:30:00Z",
        "duration": 1800,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Performance test completed. Average response time: 250ms..."
    },
    {
        "id": "run004",
        "testName": "API Test Suite",
        "status": "failed",
        "startTime": "2024-06-28T07:00:00Z",
        "endTime": "2024-06-28T07:15:00Z",
        "duration": 900,
        "result": {
            "totalTests": 30,
            "passed": 25,
            "failed": 5,
            "skipped": 0
        },
        "logs": "5 API tests failed. Endpoints affected: /users, /products..."
    },
    {
        "id": "run005",
        "testName": "Security Scan",
        "status": "success",
        "startTime": "2024-06-27T16:45:00Z",
        "endTime": "2024-06-27T17:00:00Z",
        "duration": 900,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "No critical vulnerabilities found. 2 low-risk issues identified..."
    },
    {
        "id": "run001",
        "testName": "Integration Test Suite",
        "status": "success",
        "startTime": "2024-06-28T10:30:00Z",
        "endTime": "2024-06-28T10:45:30Z",
        "duration": 930,
        "result": {
            "totalTests": 50,
            "passed": 48,
            "failed": 1,
            "skipped": 1
        },
        "logs": "Test run completed successfully. 1 test failed: 'user-auth-test'..."
    },
    {
        "id": "run002",
        "testName": "Unit Test Suite",
        "status": "running",
        "startTime": "2024-06-28T11:00:00Z",
        "endTime": "",
        "duration": 0,
        "result": {
            "totalTests": 0,
            "passed": 0,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Running tests..."
    },
    {
        "id": "run003",
        "testName": "Performance Test",
        "status": "success",
        "startTime": "2024-06-28T01:00:00Z",
        "endTime": "2024-06-28T01:30:00Z",
        "duration": 1800,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Performance test completed. Average response time: 250ms..."
    },
    {
        "id": "run004",
        "testName": "API Test Suite",
        "status": "failed",
        "startTime": "2024-06-28T07:00:00Z",
        "endTime": "2024-06-28T07:15:00Z",
        "duration": 900,
        "result": {
            "totalTests": 30,
            "passed": 25,
            "failed": 5,
            "skipped": 0
        },
        "logs": "5 API tests failed. Endpoints affected: /users, /products..."
    },
    {
        "id": "run005",
        "testName": "Security Scan",
        "status": "success",
        "startTime": "2024-06-27T16:45:00Z",
        "endTime": "2024-06-27T17:00:00Z",
        "duration": 900,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "No critical vulnerabilities found. 2 low-risk issues identified..."
    },{
        "id": "run001",
        "testName": "Integration Test Suite",
        "status": "success",
        "startTime": "2024-06-28T10:30:00Z",
        "endTime": "2024-06-28T10:45:30Z",
        "duration": 930,
        "result": {
            "totalTests": 50,
            "passed": 48,
            "failed": 1,
            "skipped": 1
        },
        "logs": "Test run completed successfully. 1 test failed: 'user-auth-test'..."
    },
    {
        "id": "run002",
        "testName": "Unit Test Suite",
        "status": "running",
        "startTime": "2024-06-28T11:00:00Z",
        "endTime": "",
        "duration": 0,
        "result": {
            "totalTests": 0,
            "passed": 0,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Running tests..."
    },
    {
        "id": "run003",
        "testName": "Performance Test",
        "status": "success",
        "startTime": "2024-06-28T01:00:00Z",
        "endTime": "2024-06-28T01:30:00Z",
        "duration": 1800,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Performance test completed. Average response time: 250ms..."
    },
    {
        "id": "run004",
        "testName": "API Test Suite",
        "status": "failed",
        "startTime": "2024-06-28T07:00:00Z",
        "endTime": "2024-06-28T07:15:00Z",
        "duration": 900,
        "result": {
            "totalTests": 30,
            "passed": 25,
            "failed": 5,
            "skipped": 0
        },
        "logs": "5 API tests failed. Endpoints affected: /users, /products..."
    },
    {
        "id": "run005",
        "testName": "Security Scan",
        "status": "success",
        "startTime": "2024-06-27T16:45:00Z",
        "endTime": "2024-06-27T17:00:00Z",
        "duration": 900,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "No critical vulnerabilities found. 2 low-risk issues identified..."
    },
    {
        "id": "run001",
        "testName": "Integration Test Suite",
        "status": "success",
        "startTime": "2024-06-28T10:30:00Z",
        "endTime": "2024-06-28T10:45:30Z",
        "duration": 930,
        "result": {
            "totalTests": 50,
            "passed": 48,
            "failed": 1,
            "skipped": 1
        },
        "logs": "Test run completed successfully. 1 test failed: 'user-auth-test'..."
    },
    {
        "id": "run002",
        "testName": "Unit Test Suite",
        "status": "running",
        "startTime": "2024-06-28T11:00:00Z",
        "endTime": "",
        "duration": 0,
        "result": {
            "totalTests": 0,
            "passed": 0,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Running tests..."
    },
    {
        "id": "run003",
        "testName": "Performance Test",
        "status": "success",
        "startTime": "2024-06-28T01:00:00Z",
        "endTime": "2024-06-28T01:30:00Z",
        "duration": 1800,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Performance test completed. Average response time: 250ms..."
    },
    {
        "id": "run004",
        "testName": "API Test Suite",
        "status": "failed",
        "startTime": "2024-06-28T07:00:00Z",
        "endTime": "2024-06-28T07:15:00Z",
        "duration": 900,
        "result": {
            "totalTests": 30,
            "passed": 25,
            "failed": 5,
            "skipped": 0
        },
        "logs": "5 API tests failed. Endpoints affected: /users, /products..."
    },
    {
        "id": "run005",
        "testName": "Security Scan",
        "status": "success",
        "startTime": "2024-06-27T16:45:00Z",
        "endTime": "2024-06-27T17:00:00Z",
        "duration": 900,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "No critical vulnerabilities found. 2 low-risk issues identified..."
    },
    {
        "id": "run001",
        "testName": "Integration Test Suite",
        "status": "success",
        "startTime": "2024-06-28T10:30:00Z",
        "endTime": "2024-06-28T10:45:30Z",
        "duration": 930,
        "result": {
            "totalTests": 50,
            "passed": 48,
            "failed": 1,
            "skipped": 1
        },
        "logs": "Test run completed successfully. 1 test failed: 'user-auth-test'..."
    },
    {
        "id": "run002",
        "testName": "Unit Test Suite",
        "status": "running",
        "startTime": "2024-06-28T11:00:00Z",
        "endTime": "",
        "duration": 0,
        "result": {
            "totalTests": 0,
            "passed": 0,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Running tests..."
    },
    {
        "id": "run003",
        "testName": "Performance Test",
        "status": "success",
        "startTime": "2024-06-28T01:00:00Z",
        "endTime": "2024-06-28T01:30:00Z",
        "duration": 1800,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "Performance test completed. Average response time: 250ms..."
    },
    {
        "id": "run004",
        "testName": "API Test Suite",
        "status": "failed",
        "startTime": "2024-06-28T07:00:00Z",
        "endTime": "2024-06-28T07:15:00Z",
        "duration": 900,
        "result": {
            "totalTests": 30,
            "passed": 25,
            "failed": 5,
            "skipped": 0
        },
        "logs": "5 API tests failed. Endpoints affected: /users, /products..."
    },
    {
        "id": "run005",
        "testName": "Security Scan",
        "status": "success",
        "startTime": "2024-06-27T16:45:00Z",
        "endTime": "2024-06-27T17:00:00Z",
        "duration": 900,
        "result": {
            "totalTests": 1,
            "passed": 1,
            "failed": 0,
            "skipped": 0
        },
        "logs": "No critical vulnerabilities found. 2 low-risk issues identified..."
    }
]
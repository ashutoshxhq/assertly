# Stage 1: Build the Rust application
FROM rust:1.79.0 as build

ARG APP_NAME=identity_service

WORKDIR /usr/src/app

# Copy only the necessary files for dependency resolution
COPY Cargo.lock Cargo.toml ./
RUN mkdir src && echo "// dummy file" > src/lib.rs

# Build the application
COPY src ./src
RUN cargo build --release

# Stage 2: Create the final lightweight image
FROM debian:buster-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy the binary from the build stage
COPY --from=build /usr/src/app/target/release/$APP_NAME /usr/local/bin/$APP_NAME

# Set the entry point for the container
CMD ["/usr/local/bin/identity_service"]

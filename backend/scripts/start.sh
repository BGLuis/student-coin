#!/usr/bin/env bash

set -e

cleanup() {
    echo "Caught signal, shutting down gracefully..."

    if [ -z $COMPILE_PID ]; then
        echo "Stopping continuous build (PID: $COMPILE_PID)..."
        kill -SIGTERM "$COMPILE_PID"
    fi
    if [ -z $RUN_PID ]; then
        echo "Stopping Spring Boot application (PID: $RUN_PID)..."
        kill -SIGTERM "$RUN_PID"
    fi

    wait
    echo "Shutdown complete."
}

trap 'cleanup' SIGTERM SIGINT

echo "Starting continuous compilation..."
./gradlew classes --continuous &
COMPILE_PID=$!
echo "Continuous compilation started with PID: $COMPILE_PID"

echo "Starting Spring Boot application..."
./gradlew bootRun &
RUN_PID=$!
echo "Spring Boot application started with PID: $RUN_PID"

wait -n
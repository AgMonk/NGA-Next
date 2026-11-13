plugins {
    kotlin("jvm") version "1.9.24"
    application
}

group = "com.nga.bbscode"
version = "0.1.0"

repositories {
    mavenCentral()
}

dependencies {
    // JSON 序列化
    implementation("com.fasterxml.jackson.core:jackson-databind:2.17.0")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.0")

    // 测试
    testImplementation("org.jetbrains.kotlin:kotlin-test")
}

application {
    mainClass.set("com.nga.bbscode.MainKt")
}

kotlin {
    jvmToolchain(17)
}

tasks.withType<Test> {
    useJUnitPlatform()
}

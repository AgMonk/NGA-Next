plugins {
    kotlin("jvm") version "2.0.21"
    application
}

group = "com.nga.bbscode"
version = "0.1.0"

repositories {
    mavenCentral()
}

dependencies {
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

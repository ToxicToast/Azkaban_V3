<div align="center">
<img src="https://github.com/ToxicToast/Azkaban_V3/raw/main/assets/text_logo.png" alt="Toaster"/>
</div>

<div align="center">

[![Node Version](https://img.shields.io/static/v1?label=Node&message=21.2.0&color=purple&style=for-the-badge)](https://nodejs.org)
[![npm Version](https://img.shields.io/static/v1?label=npm&message=10.8.2&color=purple&style=for-the-badge)](https://nodejs.org)
[![Typescript Version](https://img.shields.io/static/v1?label=Typescript&message=5.5.4&color=purple&style=for-the-badge)](https://typescriptlang.org)
[![NX Version](https://img.shields.io/static/v1?label=NX&message=19.6.2&color=purple&style=for-the-badge)](https://nx.dev)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/version/ToxicToast/Azkaban_V3?style=for-the-badge&label=VERSION&color=purple)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/ToxicToast/Azkaban_V3?style=for-the-badge&label=COMMITS&color=purple)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/ToxicToast/Azkaban_V3?style=for-the-badge&label=LAST%20COMMIT&color=purple)

![NPM Version](https://img.shields.io/npm/v/%40toxictoast%2Fazkaban-base-domain?label=Azkaban%20Domain%20Helper&style=for-the-badge&color=purple)
![NPM Version](https://img.shields.io/npm/v/%40toxictoast%2Fazkaban-base-helpers?label=Azkaban%20Helper&style=for-the-badge&color=purple)
![NPM Version](https://img.shields.io/npm/v/%40toxictoast%2Fazkaban-base-types?label=Azkaban%20Types%20Helper&style=for-the-badge&color=purple)
![NPM Version](https://img.shields.io/npm/v/%40toxictoast%2Fazkaban-broker-rabbitmq?label=Azkaban%20RabbitMQ%20Module&style=for-the-badge&color=purple)
![NPM Version](https://img.shields.io/npm/v/%40toxictoast%2Fazkaban-sdk?label=Azkaban%20SDK&style=for-the-badge&color=purple)

</div>

> **Warning:**
> This project is a Work in Progress and is not yet ready for real world usage

## Introduction

Azkaban is a complete Rewrite of my Microservices at Home.

## Planned Services

-   Twitch Services
-   Co-Working Services

## Deployed Services

-   API Gateway
-   User Service
-   Group Service
-   Authentication Service
-   Webhook Service
-   SSE Service
-   Notification Service
-   API Alerts Service
-   FoodFolio Services (Category, Company, Item, Item Detail, Item Variant, Location, Type, Size, Warehouse, Shoppinglist)
-   Admin UI (Work in Progress)

## Infrastructure

-   Docker (Containerization)
-   Kubernetes (Orchestration)
-   Traefik (Reverse Proxy)
-   RabbitMQ (Message Broker)
-   Postgres (Database)
-   NestJS (Backend Framework)
-   Redis (Cache)
-   Prometheus (Monitoring)
-   Grafana (Metrics)

## Gateway

> **Info:**
> The Gateway is the entry point for all requests to the services. It is responsible for routing requests to the correct service and publishes the correct Topic to the Message Broker.

## Alerting

> **Info:**
> Great Service for Alerting. It is used to monitor the API Post Requests which will notify me on my mobile that something new was created or a specific user logged in.

-   [API Alerts](https://apialerts.com/)

## SSE

> **Info:**
> To have some sort of Realtime Communication between the Services, the SSE Service is used to publish Events to the UI. Since i don't want to use Websockets (and i don't need to have bi-directional communication), i decided to use Server Sent Events.

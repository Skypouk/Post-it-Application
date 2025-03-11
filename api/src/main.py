from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.note import graphql_app

app = FastAPI(root_path="/api")

origins = ["http://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")

import os
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
import logging

from data.data import router as data_router, read_measurements
from guidance_strategies.app.main import app as guidance_engine


app = FastAPI()
app.include_router(data_router)


# define the directory from which strategies should be loaded
base_path = os.path.dirname(__file__)
path = base_path + './strategy_configs/'
strategy_path = os.path.join(base_path, "strategy_configs")
state_path = os.path.join(base_path, "state_vector")

# setup the guidance engine: parse strategies and set first context
guidance_engine.setup_engine(strategy_path, state_path)
# data = read_measurements()
# guidance_engine.update_state('data', data)
# start the guidance event loops
guidance_engine.start()
# make guidance engine endpoints available under /guidance
app.mount('/guidance', guidance_engine)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.exception_handler(Exception)
def handle_annotation_error(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": str(exc)
        }
    )


logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

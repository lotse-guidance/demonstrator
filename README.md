# Guidance Strategies

## Installation (development mode)

1. `docker compose up`

## Starting the backend

```python -m uvicorn main:app --reload --port 8019```

## API Documentation

API documentation (swagger) is available at `localhost:8019/guidance/docs`.

## How this library works

1. You define guidance strategies and actions as yaml files (in this example, located under `./backend/app/strategy_configs`)
2. You include the guidance engine application into your FastAPI app (see `./backend/app/main.py`)
3. In said file, you configure the path to your strategy yamls 
4. You define your state vector, also as a yaml file (see `./backend/app/state_vector/vector.yaml`)

## Getting started

1. Think about which elements you want to have as part of your analysis state vector (The vector is simply a python dictionary at the moment)
2. Configure an appropriate state vector in the yaml file. You can add arbitrarily named callbacks -- we'll see below how you use them. 
3. Replace the example strategies in the `./backend/strategy_configs` folder with your own
4. All strategies are evaluated every two seconds, or when you update the state vector.
5. Generated suggestions are sent via a websocket to which you should subscribe in your frontend (see `./frontend/src/app/services/channel.service.ts` for an example)
6. Suggestions look like this on the socket: 

``` 
{
   type: 'guidance',
   interaction: 'make'
   suggestion: {
       id: str,
       strategy: str,
       title: str,
       description: str,
       degree: str
       event: {
           value: Any,
           action_id: str
       }
   }
}
```
9. In all your visualization components, filter for the suggestions you need (e.g., by strategy and action_id)
10. Currently, you will only receive interaction-type make from the server :) 
11. When users accept/reject guidance, call the respective REST endpoints.
12. When your application state changes, you can either update the state vector as key-value pairs, or call any of the callback functions you defined in your yaml to perform more  complex operations. 

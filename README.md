
# Run the challenge!

## Method 1: Locally with docker

1. Build and start the server
```
docker build -t test-site .
docker run -d -p 8080:8080 test-site
```

2. Then run the tests from local environment:
``` npm run test ```


## Method 2: Locally with docker-compose

1. Run docker compose
``` docker-compose up ```

2. Enjoy results
3. Terminal into the container to fiddle around

```
docker ps
docker exec -it <container_id_or_name> sh
```


## Method 3: Dispatch a new workflow
1. Go to Actions
2. Run the workflow on demand
3. Check HTML report in output artifacts (or see in terminal logs within the details of the job)

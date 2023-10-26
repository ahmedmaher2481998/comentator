### notes

#### K8S

- 17
  - apply post-srv type NodePort
  - check it's created ,get the port
  - access the service and the pod via the service,make GET /posts , minikube ip to get the ip of minikube
- 18

  - we use cluster ip-svc for internal communication (event bus)
  - build img for event bus and push it to docker hub
  - create event-bus-depl apply it to the cluster,check it's running

- 19

  - event-bus-srv cluster ip ,ClusterIp type is the default type, add on to the depl file use --- to seprate apply it to the cluster
  - apply the newdpl file
  - posts srv cluster ip and apply it , use a diff service name "posts-srv" is already used in the nodeIp service u created earlier

- 20

  - communication between services
  - we use the cluster ip service name with http as a destination wit the target port of-course
  - the url for the cluster ip service we only use the name of the service with http protocol and port

- 21

  - update all code services to use the cluster ip names as api urls
  - edit the code , then build latest version push it and run
  - k rollout restart deployment [deployment name ]
  - next u should make a new post and view log to test

- 22

  - create new post
  - check logs of post pod ,access it via the node port service

- 18

  -

- 18

  -

- 18

  -

- 18

  -

- 18

  -

- 18

  -

- 18

  -

- 18

  -

- 18

  -

- ## 18

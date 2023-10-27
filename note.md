### notes

#### K8S

> > Fixed ther error of accessing the minikube by using docker a minikube driver instead of the default (qemu) that needed built in and i could'nt access it cuz it was inside of a the node as a vm

- 17
  - apply post-srv type NodePort
  - check it's created ,get the port
  - access the service and the pod via the service,make GET /posts , minikube ip to get the ip of minikube
- 18

  - we use cluster ip-svc for internal communication (event bus)
  - build img for event bus and push it to docker hub
  - create event-bus-depl apply it to the cluster,check it's running

- 19

  - event-bus-srv cluster ip ,ClusterIp type is the default type, add on to the depl file use --- to septate apply it to the cluster
  - apply the new depl file
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
  - use postman to create a post and debug the event logs in the pod of the posts pod

- 23

  - adding the rest of the app microservices
  - steps goes like this
  - for comments , moderation , query
  - update the url to the event bus srv
  - build & push the images for each
  - create a depl , srv file for each
  - update the event bus with all the srv names for the rest of the services

- 24

  - test the whole app as a one app
  - update the event bus with the service names
  - build it , push , restart depl , rollout restart deployment it
  - create a post and a comment with filter word and restore it from query , we don't have a cess to query ,just check the logs

- 25

  - we will wire up the react app
  - we will add the react server as a pod but it's not the one making the request
  - the request is made from the client browser that's running our react code
  - so to access the pods we have 2 solutions
    . 1 to create a NodeIP for each service which is very un practical cuz the port is random and it may chang with restarting the deployment
    . 2 to create a load balancer that handles the request internally we will use nginx with ingress

- 26

  - we have two way to make a load balancer , load balancer service ,which is used to make the cloud user provider load balancer in our cluster or an ingress which is a load balancer pod the distributes the traffic with a set of pre defined rules

- 27

  - add ingress-nginx
  - install ingress-nginx from the internet and run the mandatory command and take a look into it
  - look at the docs if you got stuck the [link](https://kubernetes.github.io/ingress-nginx/deploy/)

- 28

  - create ingress config file
  - teach it the routing rules we want
  - ingress-srv , apiVersion networking.k8s.io/v1beta kind Ingress ,annotation
  - rules => host ,http,paths - path , backend , service name ,port

- 29

  - the host property
  - tweak the hosts file /etc/hosts ,sys32/drivers/etc/hosts , only for he local dev
  - add 127.0.0.1(minikube ip) posts.com
  - test the host name in ur browser and get posts

- 30

  - map / to the react server
  - change urls to post.com api to the ingress nginx
  - build client image ,push it
  - create client-depl ,and add the client-serv and apply it to the cluster

- ## 31

  - setup the rest of the routing rules to the ingress srv file
  - 1:21 routing scheme try to draw it ur self first
  - edit the images (client , posts images ) to fix the conflict of the pots route
  - restart the client deployment , posts to pull the latest images

- ## 32

  - edit the ingress service and rollout restart it
  - add all routes ,use regex with wild card
  - note to add wild card for react router
  - test the whole app , make posts , comments

- ## 33

  - skaffold
  - make a config for skaffold to manage all the containers and src code
  - run it and test it rewatch the last 3 videos

- ## 34

  -
  -

- ## 35

  -
  -

- ## 36
  -
  -

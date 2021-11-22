# Blog app

A blog app organized into micro services including an hard-coded event bus from Udemy course.

## Local usage

- Install dependencies

```sh
brew install docker
brew install kubernetes
brew install skaffold
```

- Retrieve the docker images

```sh
docker pull joffreyverd/client
docker pull joffreyverd/posts
docker pull joffreyverd/comments
docker pull joffreyverd/moderation
docker pull joffreyverd/query
docker pull joffreyverd/event-bus
```

- Redirect a domain name to `localhost`

```sh
sudo vi /etc/hosts
# add the following line at the end of the file
127.0.0.1 posts.com # then !wq
```

- Run the kubernetes cluster with skaffold

```sh
cd <repository>
# then run the following
skaffold dev
```

- Visit http://posts.com

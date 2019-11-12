# notification-mailer-k8s

Docker / kubernetes version of notification-mailer

## Create a new version

1. Build a new docker image

```
docker build --no-cache -t mathiskretz/notification-mailer .
```

2. Push the docker image to dockerhub

```
docker push mathiskretz/notification-mailer:latest
```

## Requirements to run

1. Assumes that there exists a RabbitMQ service named `notification-mq`
2. Assumes that the environment variable `MAIL_URL` is containing a valid SMTP URI
3. Assumes that the environment variable `TO_ADDRESS` is containing the email address to which all notification mails are sent

## Deployment

Use [these YAML files](https://github.com/bespinian/notification-k8s).

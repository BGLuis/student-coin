FROM localstack/localstack:s3-latest

RUN apt-get install -y --no-install-recommends dos2unix=7.5.2-1 && \
  rm -rf /var/lib/apt/*

RUN mkdir -p /etc/localstack/init/ready.d
COPY ./scripts/* /etc/localstack/init/ready.d/
RUN dos2unix /etc/localstack/init/ready.d/*

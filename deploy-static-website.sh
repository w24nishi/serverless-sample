#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: bash deploy.sh S3Bucketname" 1>&2
  exit 1
fi

aws s3 sync static_website s3://$1


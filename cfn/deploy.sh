cp -rf ~/Documents/github.com/robrtsql/web/cfn/creds ~/Documents/github.com/robrtsql/web/cfn/music/node_modules
aws cloudformation package --template-file template.yaml --s3-bucket robrtsql --output-template-file pkg.yaml
aws cloudformation deploy --template-file ./pkg.yaml --stack-name testapi --capabilities CAPABILITY_IAM

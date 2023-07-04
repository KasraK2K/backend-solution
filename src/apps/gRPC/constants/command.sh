PROTO_DIR=./protos
PROTO_OUTPUT_DIR=./build
PLUGIN=grpc_tools_node_protoc_plugin

mkdir -p $PROTO_OUTPUT_DIR

# Generate JavaScript code
protoc \
  -I=$PROTO_DIR $PROTO_DIR/*.proto \
  --js_out=import_style=commonjs,binary:$PROTO_OUTPUT_DIR \
  --ts_out=import_style=commonjs,binary:$PROTO_OUTPUT_DIR \
  --grpc_out=$PROTO_OUTPUT_DIR \
  --plugin=protoc-gen-grpc=$(which $PLUGIN)

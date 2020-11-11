// source: api.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_source_context_pb = require('google-protobuf/google/protobuf/source_context_pb.js');
goog.object.extend(proto, google_protobuf_source_context_pb);
var google_protobuf_type_pb = require('google-protobuf/google/protobuf/type_pb.js');
goog.object.extend(proto, google_protobuf_type_pb);
goog.exportSymbol('proto.google.protobuf.Api', null, global);
goog.exportSymbol('proto.google.protobuf.Method', null, global);
goog.exportSymbol('proto.google.protobuf.Mixin', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.Api = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.Api.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.Api, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.protobuf.Api.displayName = 'proto.google.protobuf.Api';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.Method = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.Method.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.Method, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.protobuf.Method.displayName = 'proto.google.protobuf.Method';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.Mixin = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.Mixin, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.protobuf.Mixin.displayName = 'proto.google.protobuf.Mixin';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.Api.repeatedFields_ = [2,3,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.Api.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.Api.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.Api} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Api.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    methodsList: jspb.Message.toObjectList(msg.getMethodsList(),
    proto.google.protobuf.Method.toObject, includeInstance),
    optionsList: jspb.Message.toObjectList(msg.getOptionsList(),
    google_protobuf_type_pb.Option.toObject, includeInstance),
    version: jspb.Message.getFieldWithDefault(msg, 4, ""),
    sourceContext: (f = msg.getSourceContext()) && google_protobuf_source_context_pb.SourceContext.toObject(includeInstance, f),
    mixinsList: jspb.Message.toObjectList(msg.getMixinsList(),
    proto.google.protobuf.Mixin.toObject, includeInstance),
    syntax: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.Api}
 */
proto.google.protobuf.Api.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.Api;
  return proto.google.protobuf.Api.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.Api} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.Api}
 */
proto.google.protobuf.Api.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.google.protobuf.Method;
      reader.readMessage(value,proto.google.protobuf.Method.deserializeBinaryFromReader);
      msg.addMethods(value);
      break;
    case 3:
      var value = new google_protobuf_type_pb.Option;
      reader.readMessage(value,google_protobuf_type_pb.Option.deserializeBinaryFromReader);
      msg.addOptions(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    case 5:
      var value = new google_protobuf_source_context_pb.SourceContext;
      reader.readMessage(value,google_protobuf_source_context_pb.SourceContext.deserializeBinaryFromReader);
      msg.setSourceContext(value);
      break;
    case 6:
      var value = new proto.google.protobuf.Mixin;
      reader.readMessage(value,proto.google.protobuf.Mixin.deserializeBinaryFromReader);
      msg.addMixins(value);
      break;
    case 7:
      var value = /** @type {!proto.google.protobuf.Syntax} */ (reader.readEnum());
      msg.setSyntax(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.Api.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.Api.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.Api} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Api.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMethodsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.google.protobuf.Method.serializeBinaryToWriter
    );
  }
  f = message.getOptionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      google_protobuf_type_pb.Option.serializeBinaryToWriter
    );
  }
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getSourceContext();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_source_context_pb.SourceContext.serializeBinaryToWriter
    );
  }
  f = message.getMixinsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.google.protobuf.Mixin.serializeBinaryToWriter
    );
  }
  f = message.getSyntax();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.Api.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Method methods = 2;
 * @return {!Array<!proto.google.protobuf.Method>}
 */
proto.google.protobuf.Api.prototype.getMethodsList = function() {
  return /** @type{!Array<!proto.google.protobuf.Method>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.Method, 2));
};


/**
 * @param {!Array<!proto.google.protobuf.Method>} value
 * @return {!proto.google.protobuf.Api} returns this
*/
proto.google.protobuf.Api.prototype.setMethodsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.Method=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Method}
 */
proto.google.protobuf.Api.prototype.addMethods = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.Method, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.clearMethodsList = function() {
  return this.setMethodsList([]);
};


/**
 * repeated Option options = 3;
 * @return {!Array<!proto.google.protobuf.Option>}
 */
proto.google.protobuf.Api.prototype.getOptionsList = function() {
  return /** @type{!Array<!proto.google.protobuf.Option>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_type_pb.Option, 3));
};


/**
 * @param {!Array<!proto.google.protobuf.Option>} value
 * @return {!proto.google.protobuf.Api} returns this
*/
proto.google.protobuf.Api.prototype.setOptionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.google.protobuf.Option=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Option}
 */
proto.google.protobuf.Api.prototype.addOptions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.google.protobuf.Option, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.clearOptionsList = function() {
  return this.setOptionsList([]);
};


/**
 * optional string version = 4;
 * @return {string}
 */
proto.google.protobuf.Api.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional SourceContext source_context = 5;
 * @return {?proto.google.protobuf.SourceContext}
 */
proto.google.protobuf.Api.prototype.getSourceContext = function() {
  return /** @type{?proto.google.protobuf.SourceContext} */ (
    jspb.Message.getWrapperField(this, google_protobuf_source_context_pb.SourceContext, 5));
};


/**
 * @param {?proto.google.protobuf.SourceContext|undefined} value
 * @return {!proto.google.protobuf.Api} returns this
*/
proto.google.protobuf.Api.prototype.setSourceContext = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.clearSourceContext = function() {
  return this.setSourceContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.protobuf.Api.prototype.hasSourceContext = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * repeated Mixin mixins = 6;
 * @return {!Array<!proto.google.protobuf.Mixin>}
 */
proto.google.protobuf.Api.prototype.getMixinsList = function() {
  return /** @type{!Array<!proto.google.protobuf.Mixin>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.Mixin, 6));
};


/**
 * @param {!Array<!proto.google.protobuf.Mixin>} value
 * @return {!proto.google.protobuf.Api} returns this
*/
proto.google.protobuf.Api.prototype.setMixinsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.google.protobuf.Mixin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Mixin}
 */
proto.google.protobuf.Api.prototype.addMixins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.google.protobuf.Mixin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.clearMixinsList = function() {
  return this.setMixinsList([]);
};


/**
 * optional Syntax syntax = 7;
 * @return {!proto.google.protobuf.Syntax}
 */
proto.google.protobuf.Api.prototype.getSyntax = function() {
  return /** @type {!proto.google.protobuf.Syntax} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.google.protobuf.Syntax} value
 * @return {!proto.google.protobuf.Api} returns this
 */
proto.google.protobuf.Api.prototype.setSyntax = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.Method.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.Method.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.Method.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.Method} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Method.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    requestTypeUrl: jspb.Message.getFieldWithDefault(msg, 2, ""),
    requestStreaming: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    responseTypeUrl: jspb.Message.getFieldWithDefault(msg, 4, ""),
    responseStreaming: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    optionsList: jspb.Message.toObjectList(msg.getOptionsList(),
    google_protobuf_type_pb.Option.toObject, includeInstance),
    syntax: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.Method}
 */
proto.google.protobuf.Method.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.Method;
  return proto.google.protobuf.Method.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.Method} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.Method}
 */
proto.google.protobuf.Method.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRequestTypeUrl(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRequestStreaming(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setResponseTypeUrl(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResponseStreaming(value);
      break;
    case 6:
      var value = new google_protobuf_type_pb.Option;
      reader.readMessage(value,google_protobuf_type_pb.Option.deserializeBinaryFromReader);
      msg.addOptions(value);
      break;
    case 7:
      var value = /** @type {!proto.google.protobuf.Syntax} */ (reader.readEnum());
      msg.setSyntax(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.Method.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.Method.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.Method} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Method.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRequestTypeUrl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRequestStreaming();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getResponseTypeUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getResponseStreaming();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getOptionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      google_protobuf_type_pb.Option.serializeBinaryToWriter
    );
  }
  f = message.getSyntax();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.Method.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string request_type_url = 2;
 * @return {string}
 */
proto.google.protobuf.Method.prototype.getRequestTypeUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.setRequestTypeUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool request_streaming = 3;
 * @return {boolean}
 */
proto.google.protobuf.Method.prototype.getRequestStreaming = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.setRequestStreaming = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string response_type_url = 4;
 * @return {string}
 */
proto.google.protobuf.Method.prototype.getResponseTypeUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.setResponseTypeUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool response_streaming = 5;
 * @return {boolean}
 */
proto.google.protobuf.Method.prototype.getResponseStreaming = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.setResponseStreaming = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * repeated Option options = 6;
 * @return {!Array<!proto.google.protobuf.Option>}
 */
proto.google.protobuf.Method.prototype.getOptionsList = function() {
  return /** @type{!Array<!proto.google.protobuf.Option>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_type_pb.Option, 6));
};


/**
 * @param {!Array<!proto.google.protobuf.Option>} value
 * @return {!proto.google.protobuf.Method} returns this
*/
proto.google.protobuf.Method.prototype.setOptionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.google.protobuf.Option=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Option}
 */
proto.google.protobuf.Method.prototype.addOptions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.google.protobuf.Option, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.clearOptionsList = function() {
  return this.setOptionsList([]);
};


/**
 * optional Syntax syntax = 7;
 * @return {!proto.google.protobuf.Syntax}
 */
proto.google.protobuf.Method.prototype.getSyntax = function() {
  return /** @type {!proto.google.protobuf.Syntax} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.google.protobuf.Syntax} value
 * @return {!proto.google.protobuf.Method} returns this
 */
proto.google.protobuf.Method.prototype.setSyntax = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.Mixin.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.Mixin.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.Mixin} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Mixin.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    root: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.Mixin}
 */
proto.google.protobuf.Mixin.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.Mixin;
  return proto.google.protobuf.Mixin.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.Mixin} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.Mixin}
 */
proto.google.protobuf.Mixin.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRoot(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.Mixin.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.Mixin.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.Mixin} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Mixin.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRoot();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.Mixin.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Mixin} returns this
 */
proto.google.protobuf.Mixin.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string root = 2;
 * @return {string}
 */
proto.google.protobuf.Mixin.prototype.getRoot = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.protobuf.Mixin} returns this
 */
proto.google.protobuf.Mixin.prototype.setRoot = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.google.protobuf);

/**
 * @fileoverview gRPC-Web generated client stub for earth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var earth_message_pb = require('./earth_message_pb.js')
const proto = {};
proto.earth = require('./earth_rpc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.earth.EarthClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.earth.EarthPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodDescriptor_Earth_getBonusSubsidyData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getBonusSubsidyData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodInfo_Earth_getBonusSubsidyData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getBonusSubsidyData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getBonusSubsidyData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSubsidyData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getBonusSubsidyData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getBonusSubsidyData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSubsidyData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.StatisticsDataRes>}
 */
const methodDescriptor_Earth_getAreaBonusDetailData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getAreaBonusDetailData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.StatisticsDataRes,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.StatisticsDataRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.StatisticsDataRes>}
 */
const methodInfo_Earth_getAreaBonusDetailData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.StatisticsDataRes,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.StatisticsDataRes.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.StatisticsDataRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.StatisticsDataRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getAreaBonusDetailData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getAreaBonusDetailData',
      request,
      metadata || {},
      methodDescriptor_Earth_getAreaBonusDetailData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.StatisticsDataRes>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getAreaBonusDetailData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getAreaBonusDetailData',
      request,
      metadata || {},
      methodDescriptor_Earth_getAreaBonusDetailData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodDescriptor_Earth_getAreaSubsidyData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getAreaSubsidyData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodInfo_Earth_getAreaSubsidyData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getAreaSubsidyData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getAreaSubsidyData',
      request,
      metadata || {},
      methodDescriptor_Earth_getAreaSubsidyData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getAreaSubsidyData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getAreaSubsidyData',
      request,
      metadata || {},
      methodDescriptor_Earth_getAreaSubsidyData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodDescriptor_Earth_getBonusDetailData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getBonusDetailData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodInfo_Earth_getBonusDetailData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getBonusDetailData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getBonusDetailData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusDetailData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getBonusDetailData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getBonusDetailData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusDetailData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusRes>}
 */
const methodDescriptor_Earth_getBonusSituationData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getBonusSituationData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusRes,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusRes>}
 */
const methodInfo_Earth_getBonusSituationData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusRes,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusRes.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getBonusSituationData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getBonusSituationData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSituationData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusRes>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getBonusSituationData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getBonusSituationData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSituationData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodDescriptor_Earth_getBonusRankData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getBonusRankData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodInfo_Earth_getBonusRankData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getBonusRankData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getBonusRankData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusRankData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getBonusRankData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getBonusRankData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusRankData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.DictRegionReq,
 *   !proto.earth.DictRegionList>}
 */
const methodDescriptor_Earth_getRegionList = new grpc.web.MethodDescriptor(
  '/earth.Earth/getRegionList',
  grpc.web.MethodType.UNARY,
  earth_message_pb.DictRegionReq,
  earth_message_pb.DictRegionList,
  /**
   * @param {!proto.earth.DictRegionReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.DictRegionList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.DictRegionReq,
 *   !proto.earth.DictRegionList>}
 */
const methodInfo_Earth_getRegionList = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.DictRegionList,
  /**
   * @param {!proto.earth.DictRegionReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.DictRegionList.deserializeBinary
);


/**
 * @param {!proto.earth.DictRegionReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.DictRegionList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.DictRegionList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getRegionList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getRegionList',
      request,
      metadata || {},
      methodDescriptor_Earth_getRegionList,
      callback);
};


/**
 * @param {!proto.earth.DictRegionReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.DictRegionList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getRegionList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getRegionList',
      request,
      metadata || {},
      methodDescriptor_Earth_getRegionList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodDescriptor_Earth_getRebatesListByRegionCode = new grpc.web.MethodDescriptor(
  '/earth.Earth/getRebatesListByRegionCode',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodInfo_Earth_getRebatesListByRegionCode = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getRebatesListByRegionCode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getRebatesListByRegionCode',
      request,
      metadata || {},
      methodDescriptor_Earth_getRebatesListByRegionCode,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getRebatesListByRegionCode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getRebatesListByRegionCode',
      request,
      metadata || {},
      methodDescriptor_Earth_getRebatesListByRegionCode);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.GraphicStatisticsResList>}
 */
const methodDescriptor_Earth_getGraphicStatistics = new grpc.web.MethodDescriptor(
  '/earth.Earth/getGraphicStatistics',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.GraphicStatisticsResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.GraphicStatisticsResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.GraphicStatisticsResList>}
 */
const methodInfo_Earth_getGraphicStatistics = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.GraphicStatisticsResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.GraphicStatisticsResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.GraphicStatisticsResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.GraphicStatisticsResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getGraphicStatistics =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getGraphicStatistics',
      request,
      metadata || {},
      methodDescriptor_Earth_getGraphicStatistics,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.GraphicStatisticsResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getGraphicStatistics =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getGraphicStatistics',
      request,
      metadata || {},
      methodDescriptor_Earth_getGraphicStatistics);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.StatisticsDataRes>}
 */
const methodDescriptor_Earth_getStatisticsData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getStatisticsData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.StatisticsDataRes,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.StatisticsDataRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.StatisticsDataRes>}
 */
const methodInfo_Earth_getStatisticsData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.StatisticsDataRes,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.StatisticsDataRes.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.StatisticsDataRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.StatisticsDataRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getStatisticsData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getStatisticsData',
      request,
      metadata || {},
      methodDescriptor_Earth_getStatisticsData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.StatisticsDataRes>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getStatisticsData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getStatisticsData',
      request,
      metadata || {},
      methodDescriptor_Earth_getStatisticsData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodDescriptor_Earth_getBonusSituationDataList = new grpc.web.MethodDescriptor(
  '/earth.Earth/getBonusSituationDataList',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResList>}
 */
const methodInfo_Earth_getBonusSituationDataList = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getBonusSituationDataList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getBonusSituationDataList',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSituationDataList,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getBonusSituationDataList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getBonusSituationDataList',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSituationDataList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResAllList>}
 */
const methodDescriptor_Earth_getBonusSubsidyAllData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getBonusSubsidyAllData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResAllList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResAllList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResAllList>}
 */
const methodInfo_Earth_getBonusSubsidyAllData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResAllList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResAllList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResAllList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResAllList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getBonusSubsidyAllData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getBonusSubsidyAllData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSubsidyAllData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResAllList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getBonusSubsidyAllData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getBonusSubsidyAllData',
      request,
      metadata || {},
      methodDescriptor_Earth_getBonusSubsidyAllData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResAllList>}
 */
const methodDescriptor_Earth_getAreaSubsidyAllData = new grpc.web.MethodDescriptor(
  '/earth.Earth/getAreaSubsidyAllData',
  grpc.web.MethodType.UNARY,
  earth_message_pb.StatisticalReq,
  earth_message_pb.BonusResAllList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResAllList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.StatisticalReq,
 *   !proto.earth.BonusResAllList>}
 */
const methodInfo_Earth_getAreaSubsidyAllData = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.BonusResAllList,
  /**
   * @param {!proto.earth.StatisticalReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.BonusResAllList.deserializeBinary
);


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.BonusResAllList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.BonusResAllList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getAreaSubsidyAllData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getAreaSubsidyAllData',
      request,
      metadata || {},
      methodDescriptor_Earth_getAreaSubsidyAllData,
      callback);
};


/**
 * @param {!proto.earth.StatisticalReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.BonusResAllList>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getAreaSubsidyAllData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getAreaSubsidyAllData',
      request,
      metadata || {},
      methodDescriptor_Earth_getAreaSubsidyAllData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.earth.DictRegionReq,
 *   !proto.earth.DictRegion>}
 */
const methodDescriptor_Earth_getRegionCodeByName = new grpc.web.MethodDescriptor(
  '/earth.Earth/getRegionCodeByName',
  grpc.web.MethodType.UNARY,
  earth_message_pb.DictRegionReq,
  earth_message_pb.DictRegion,
  /**
   * @param {!proto.earth.DictRegionReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.DictRegion.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.earth.DictRegionReq,
 *   !proto.earth.DictRegion>}
 */
const methodInfo_Earth_getRegionCodeByName = new grpc.web.AbstractClientBase.MethodInfo(
  earth_message_pb.DictRegion,
  /**
   * @param {!proto.earth.DictRegionReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  earth_message_pb.DictRegion.deserializeBinary
);


/**
 * @param {!proto.earth.DictRegionReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.earth.DictRegion)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.earth.DictRegion>|undefined}
 *     The XHR Node Readable Stream
 */
proto.earth.EarthClient.prototype.getRegionCodeByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/earth.Earth/getRegionCodeByName',
      request,
      metadata || {},
      methodDescriptor_Earth_getRegionCodeByName,
      callback);
};


/**
 * @param {!proto.earth.DictRegionReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.earth.DictRegion>}
 *     A native promise that resolves to the response
 */
proto.earth.EarthPromiseClient.prototype.getRegionCodeByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/earth.Earth/getRegionCodeByName',
      request,
      metadata || {},
      methodDescriptor_Earth_getRegionCodeByName);
};


module.exports = proto.earth;


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.handleOutOfOrderSloppy = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// queuedOps are already applied locally, so for this implementation don't need to apply again
// but do need to pass them in here in case future algorithms need them
var handleOutOfOrderSloppy = function handleOutOfOrderSloppy(_ref) {
  var queuedOps = _ref.queuedOps,
      remoteOps = _ref.remoteOps,
      _ref$newOps = _ref.newOps,
      newOps = _ref$newOps === void 0 ? [] : _ref$newOps;
  return [].concat(_toConsumableArray(remoteOps), _toConsumableArray(newOps));
};

exports.handleOutOfOrderSloppy = handleOutOfOrderSloppy;
var getHeaders = {
  Accept: 'application/json'
};

var postHeaders = _objectSpread({}, getHeaders, {
  'Content-Type': 'application/json'
});

var Operative =
/*#__PURE__*/
function () {
  function Operative() {
    var _this = this;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        httpClient = _ref2.httpClient,
        webSocket = _ref2.webSocket,
        handleOutOfOrder = _ref2.handleOutOfOrder,
        persister = _ref2.persister,
        onChange = _ref2.onChange,
        _ref2$records = _ref2.records,
        _records2 = _ref2$records === void 0 ? [] : _ref2$records,
        _ref2$operationsEnque = _ref2.operationsEnqueuedForServer,
        operationsEnqueuedForServer = _ref2$operationsEnque === void 0 ? [] : _ref2$operationsEnque,
        _ref2$lastSync = _ref2.lastSync,
        lastSync = _ref2$lastSync === void 0 ? null : _ref2$lastSync;

    _classCallCheck(this, Operative);

    _httpClient.set(this, {
      writable: true,
      value: void 0
    });

    _webSocket.set(this, {
      writable: true,
      value: void 0
    });

    _handleOutOfOrder.set(this, {
      writable: true,
      value: void 0
    });

    _persister.set(this, {
      writable: true,
      value: void 0
    });

    _onChange.set(this, {
      writable: true,
      value: void 0
    });

    _records.set(this, {
      writable: true,
      value: void 0
    });

    _operationsEnqueuedForServer.set(this, {
      writable: true,
      value: void 0
    });

    _lastSync.set(this, {
      writable: true,
      value: void 0
    });

    _operationsUrl.set(this, {
      writable: true,
      value: function value() {
        return "/operations?since=".concat(_classPrivateFieldGet(_this, _lastSync));
      }
    });

    _sendOperationsWithQueueing.set(this, {
      writable: true,
      value: function value(newOps) {
        var queuedOps = _classPrivateFieldGet(_this, _operationsEnqueuedForServer); // A = this.#operationsEnqueuedForServer
        // B = operations


        var operationsToSendToServer = [].concat(_toConsumableArray(queuedOps), _toConsumableArray(newOps)); // Sends A and B

        return _classPrivateFieldGet(_this, _sendOperations).call(_this, operationsToSendToServer).then(function (remoteOps) {
          var operationsToApply = _classPrivateFieldGet(_this, _handleOutOfOrder).call(_this, {
            remoteOps: remoteOps,
            newOps: newOps,
            queuedOps: queuedOps
          });

          console.log({
            newOps: newOps,
            queuedOps: queuedOps,
            remoteOps: remoteOps,
            operationsToSendToServer: operationsToSendToServer,
            operationsToApply: operationsToApply
          });

          _classPrivateFieldSet(_this, _operationsEnqueuedForServer, []);

          return operationsToApply;
        })["catch"](function (e) {
          console.log(e);

          _classPrivateFieldSet(_this, _operationsEnqueuedForServer, operationsToSendToServer); // resolve to allow applying operations locally


          return newOps;
        });
      }
    });

    _removeFromSet.set(this, {
      writable: true,
      value: function value(_ref3) {
        var set = _ref3.set,
            itemsToRemove = _ref3.itemsToRemove;
        var idsToRemove = itemsToRemove.map(function (o) {
          return o.id;
        });
        return set.filter(function (o) {
          return !idsToRemove.includes(o.id);
        });
      }
    });

    _getOperations.set(this, {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_this, _httpClient).get(_classPrivateFieldGet(_this, _operationsUrl).call(_this), {
          headers: getHeaders
        }).then(function (_ref4) {
          var operations = _ref4.data;
          return operations;
        });
      }
    });

    _sendOperations.set(this, {
      writable: true,
      value: function value(operations) {
        console.log('#sendOperations', {
          operations: operations
        });

        if (_classPrivateFieldGet(_this, _webSocket) && _classPrivateFieldGet(_this, _webSocket).readyState === WebSocket.OPEN) {
          console.log('sending via web socket');
          var message = JSON.stringify(operations);

          _classPrivateFieldGet(_this, _webSocket).send(message);

          return Promise.resolve([]);
        } else {
          console.log('sending via http');
          return _classPrivateFieldGet(_this, _httpClient).post(_classPrivateFieldGet(_this, _operationsUrl).call(_this), operations, {
            headers: postHeaders
          }).then(function (_ref5) {
            var operations = _ref5.data;
            return operations;
          });
        }
      }
    });

    _trackLastSync.set(this, {
      writable: true,
      value: function value() {
        _classPrivateFieldSet(_this, _lastSync, new Date().getTime());
      }
    });

    _applyOperations.set(this, {
      writable: true,
      value: function value(operations) {
        _classPrivateFieldSet(_this, _records, operations.reduce(_classPrivateFieldGet(_this, _applyOperation), _classPrivateFieldGet(_this, _records)));

        _classPrivateFieldGet(_this, _trackLastSync).call(_this);

        _classPrivateFieldGet(_this, _persist).call(_this);

        if (_classPrivateFieldGet(_this, _onChange)) {
          _classPrivateFieldGet(_this, _onChange).call(_this, _classPrivateFieldGet(_this, _records));
        }
      }
    });

    _applyOperation.set(this, {
      writable: true,
      value: function value(records, operation) {
        switch (operation.action) {
          case 'create':
            {
              var record = _objectSpread({
                id: operation.recordId
              }, operation.attributes);

              return [].concat(_toConsumableArray(records), [record]);
            }

          case 'update':
            return records.map(function (record) {
              return record.id === operation.recordId ? _objectSpread({}, record, {}, operation.attributes) : record;
            });

          case 'delete':
            return records.filter(function (record) {
              return record.id !== operation.recordId;
            });
        }
      }
    });

    _persist.set(this, {
      writable: true,
      value: function value() {
        var data = {
          records: _classPrivateFieldGet(_this, _records),
          operationsEnqueuedForServer: _classPrivateFieldGet(_this, _operationsEnqueuedForServer),
          lastSync: _classPrivateFieldGet(_this, _lastSync)
        };

        _classPrivateFieldGet(_this, _persister).save(data);
      }
    });

    _setUpWebSocket.set(this, {
      writable: true,
      value: function value() {
        var socket = _classPrivateFieldGet(_this, _webSocket);

        if (!socket) {
          return;
        }

        socket.onopen = function () {
          console.log('Web socket connected');
        };

        socket.onclose = function () {
          console.log('Web socket closed');
        };

        socket.onmessage = function (_ref6) {
          var message = _ref6.data;
          var operations = JSON.parse(message);
          console.log("Operations: ".concat(message));

          _classPrivateFieldGet(_this, _applyOperations).call(_this, operations);
        };
      }
    });

    if (!httpClient) throw new Error('httpClient must be provided');
    if (!handleOutOfOrder) throw new Error('handleOutOfOrder must be provided');
    if (!persister) throw new Error('persister must be provided');

    _classPrivateFieldSet(this, _httpClient, httpClient);

    _classPrivateFieldSet(this, _webSocket, webSocket);

    _classPrivateFieldSet(this, _handleOutOfOrder, handleOutOfOrder);

    _classPrivateFieldSet(this, _persister, persister);

    _classPrivateFieldSet(this, _onChange, onChange);

    _classPrivateFieldSet(this, _records, _records2);

    _classPrivateFieldSet(this, _operationsEnqueuedForServer, operationsEnqueuedForServer);

    _classPrivateFieldSet(this, _lastSync, lastSync);

    _classPrivateFieldGet(this, _setUpWebSocket).call(this);
  }

  _createClass(Operative, [{
    key: "loadAll",
    value: function loadAll() {
      var _this2 = this;

      return _classPrivateFieldGet(this, _httpClient).get('/', {
        headers: getHeaders
      }).then(function (_ref7) {
        var data = _ref7.data;

        _classPrivateFieldSet(_this2, _records, data);

        _classPrivateFieldGet(_this2, _trackLastSync).call(_this2);

        _classPrivateFieldGet(_this2, _persist).call(_this2);
      });
    }
  }, {
    key: "sync",
    value: function sync() {
      var _this3 = this;

      var queuedOps = _classPrivateFieldGet(this, _operationsEnqueuedForServer); // A


      console.log({
        queuedOps: queuedOps
      });

      if (queuedOps.length === 0) {
        return _classPrivateFieldGet(this, _getOperations).call(this).then(_classPrivateFieldGet(this, _applyOperations));
      }

      return _classPrivateFieldGet(this, _sendOperations).call(this, queuedOps).then(function (remoteOps) {
        var operationsToApply = _classPrivateFieldGet(_this3, _handleOutOfOrder).call(_this3, {
          remoteOps: remoteOps,
          queuedOps: queuedOps
        }); // Just receives C back
        // Call the reconciliation function here, with A and C, and B is empty


        _classPrivateFieldGet(_this3, _applyOperations).call(_this3, operationsToApply);

        _classPrivateFieldSet(_this3, _operationsEnqueuedForServer, []);
      });
    }
  }, {
    key: "create",
    value: function create(attributes) {
      var createOperation = {
        action: 'create',
        id: (0, _v["default"])(),
        recordId: (0, _v["default"])(),
        attributes: attributes
      };
      return _classPrivateFieldGet(this, _sendOperationsWithQueueing).call(this, [createOperation]).then(_classPrivateFieldGet(this, _applyOperations));
    }
  }, {
    key: "update",
    value: function update(record, attributes) {
      var updateOperation = {
        action: 'update',
        id: (0, _v["default"])(),
        recordId: record.id,
        attributes: attributes
      };
      return _classPrivateFieldGet(this, _sendOperationsWithQueueing).call(this, [updateOperation]).then(_classPrivateFieldGet(this, _applyOperations));
    }
  }, {
    key: "delete",
    value: function _delete(recordToDelete) {
      var deleteOperation = {
        action: 'delete',
        id: (0, _v["default"])(),
        recordId: recordToDelete.id
      };
      return _classPrivateFieldGet(this, _sendOperationsWithQueueing).call(this, [deleteOperation]).then(_classPrivateFieldGet(this, _applyOperations));
    }
  }, {
    key: "records",
    get: function get() {
      return _classPrivateFieldGet(this, _records);
    }
  }]);

  return Operative;
}();

var _httpClient = new WeakMap();

var _webSocket = new WeakMap();

var _handleOutOfOrder = new WeakMap();

var _persister = new WeakMap();

var _onChange = new WeakMap();

var _records = new WeakMap();

var _operationsEnqueuedForServer = new WeakMap();

var _lastSync = new WeakMap();

var _operationsUrl = new WeakMap();

var _sendOperationsWithQueueing = new WeakMap();

var _removeFromSet = new WeakMap();

var _getOperations = new WeakMap();

var _sendOperations = new WeakMap();

var _trackLastSync = new WeakMap();

var _applyOperations = new WeakMap();

var _applyOperation = new WeakMap();

var _persist = new WeakMap();

var _setUpWebSocket = new WeakMap();

var OperativeFactory = {
  create: function create() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        httpClient = _ref8.httpClient,
        webSocket = _ref8.webSocket,
        handleOutOfOrder = _ref8.handleOutOfOrder,
        persister = _ref8.persister,
        onChange = _ref8.onChange;

    if (!persister) throw new Error('persister must be provided');
    return persister.load().then(function (persistedData) {
      return new Operative(_objectSpread({
        httpClient: httpClient,
        webSocket: webSocket,
        handleOutOfOrder: handleOutOfOrder,
        persister: persister,
        onChange: onChange
      }, persistedData));
    });
  }
};
var _default = OperativeFactory;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
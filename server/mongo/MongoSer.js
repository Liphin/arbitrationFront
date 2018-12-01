/**
 * Created by Administrator on 2018/11/26.
 * nodeJs使用mongodb的公共调用方法
 */
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbArbitration = 'arbitration';

/**
 * 连接数据库操作
 * @param callback
 */
var connectToMongo = function (callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        assert.equal(null, err);
        callback(db);
    });
};

/**
 * 查询数据库操作
 * @param collection
 * @param findObj
 * @param callback
 */
var findDocuments = function (collection, findObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        //根据条件查找collection中相应数据
        db.db(dbArbitration).collection(collection).find(findObj).toArray(function (err, docs) {
            assert.equal(null, err);
            callback(docs);
            db.close();
        });
    })
};


/**
 * 插入一条数据的数据库操作
 * @param db
 * @param collection
 * @param insertObj
 * @param callback
 */
var insertOneDocuments = function (collection, insertObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(dbArbitration).collection(collection).insertOne(insertObj, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 插入多条数据的数据库操作
 * @param db
 * @param collection
 * @param insertObj
 * @param callback
 */
var insertManyDocuments = function (collection, insertObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(dbArbitration).collection(collection).insertMany(insertObj, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 更一条新数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param updateObj 更新对象
 * @param callback
 */
var updateOneDocuments = function (collection, whereStr, updateObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        var updateStr = {$set: updateObj};
        db.db(dbArbitration).collection(collection).updateOne(whereStr, updateStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 更多条新数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param updateObj 更新对象
 * @param callback
 */
var updateManyDocuments = function (collection, whereStr, updateObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        var updateStr = {$set: updateObj};
        db.db(dbArbitration).collection(collection).updateMany(whereStr, updateStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};


/**
 * 删除一条数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param callback
 */
var deleteOneDocuments = function (collection, whereStr, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(dbArbitration).collection(collection).deleteOne(whereStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 删除多条数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param callback
 */
var deleteManyDocuments = function (collection, whereStr, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(dbArbitration).collection(collection).deleteMany(whereStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};


module.exports ={
    findDocuments: findDocuments,
    insertOneDocuments: insertOneDocuments,
    insertManyDocuments: insertManyDocuments,
    updateOneDocuments: updateOneDocuments,
    updateManyDocuments: updateManyDocuments,
    deleteOneDocuments: deleteOneDocuments,
    deleteManyDocuments: deleteManyDocuments
};






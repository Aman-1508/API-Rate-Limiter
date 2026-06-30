-- KEYS[1] = Redis key

-- ARGV[1] = Current timestamp (ms)
-- ARGV[2] = Window (seconds)
-- ARGV[3] = Limit
-- ARGV[4] = Unique request id

local key = KEYS[1]

local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2]) * 1000
local limit = tonumber(ARGV[3])
local requestId = ARGV[4]

local windowStart = now - window
redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)

local count = redis.call("ZCARD", key)

if count >= limit then

    local ttl = redis.call("PTTL", key)

    return {
        0,
        count,
        0,
        ttl
    }

end

redis.call("ZADD", key, now, requestId)

redis.call("PEXPIRE", key, window)

count = count + 1

local remaining = limit - count

local ttl = redis.call("PTTL", key)

return {
    1,
    count,
    remaining,
    ttl
}
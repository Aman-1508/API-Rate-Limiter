-- KEYS[1] = bucket key

-- ARGV[1] = current timestamp (ms)
-- ARGV[2] = capacity
-- ARGV[3] = refill rate (tokens/sec)
-- ARGV[4] = bucket ttl (seconds)

local key = KEYS[1]

local now = tonumber(ARGV[1])

local capacity = tonumber(ARGV[2])

local refillRate = tonumber(ARGV[3])

local ttl = tonumber(ARGV[4])


-- Read bucket

local bucket = redis.call("HMGET", key, "tokens", "lastRefill")

local tokens = tonumber(bucket[1])

local lastRefill = tonumber(bucket[2])


-- First request

if tokens == nil then

    tokens = capacity

    lastRefill = now

end



local elapsed = (now - lastRefill) / 1000


-- Refill

tokens = math.min(

    capacity,

    tokens + elapsed * refillRate

)


-- No tokens

if tokens < 1 then

    local retryAfter = math.ceil((1 - tokens) / refillRate)

    return {

        0,

        tokens,

        retryAfter

    }

end


-- Consume token

tokens = tokens - 1


-- Save bucket

redis.call(

    "HMSET",

    key,

    "tokens",

    tokens,

    "lastRefill",

    now

)

redis.call("EXPIRE", key, ttl)


return {

    1,

    tokens,

    0

}
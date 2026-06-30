-- KEYS[1] = Redis Key
-- ARGV[1] = Window (seconds)
-- ARGV[2] = Limit

local current = redis.call("INCR", KEYS[1])

if current == 1 then
    redis.call("EXPIRE", KEYS[1], ARGV[1])
end

local ttl = redis.call("TTL", KEYS[1])

local limit = tonumber(ARGV[2])

local remaining = math.max(0, limit - current)

local allowed = 1

if current > limit then
    allowed = 0
end

return {
    allowed,
    current,
    remaining,
    ttl
}
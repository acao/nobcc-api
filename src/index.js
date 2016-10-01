import fs from "fs";
import Koa from "koa";
import convert from "koa-convert";
import body from "koa-better-body";
import cors from "koa-cors";
import toml from "toml";

import logger, { koaLogger } from "./logger";

import { donation, membership, getPlans } from "./lib";

const router = require('koa-router')({ prefix: "/api" });
const app = new Koa();
const port = process.env.PORT || 9003;

app.use(convert(body()));
app.use(convert(cors({ origins: ["http://127.0.0.1:8888"] })));

app.use(convert(koaLogger));

router.get(`/plans`, async(ctx, next) => {
  try {
    ctx.body = await getPlans(ctx.body);
    ctx.status = 200;
    logger.info(`Donation handled successfully`);
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    logger.error(`Donation failed with ${err.message}`)
    await next();
  }
});

router.post(`/donation`, async(ctx, next) => {
  try {
    ctx.body = await donation(ctx.body);
    ctx.status = 200;
    logger.info(`Donation handled successfully`);
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    logger.error(`Donation failed with ${err.message}`)
    await next();
  }
});

router.post(`/membership`, async(ctx, next) => {
  try {
    ctx.body = await membership(ctx.body);
    ctx.status = 200;
    logger.info(`Membership handled successfully`);
    await next();
  } catch (err) {
    logger.error(`Membership creation failed with ${err.message}`)
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    await next();
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
logger.info(`now listening on http://localhost:${port}`);

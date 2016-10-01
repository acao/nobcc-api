import Stripe from "stripe";
import toml from "toml";
import fs from "fs";
const { STRIPE_PRIVATE_KEY } = process.env;
const gateway = new Stripe(STRIPE_PRIVATE_KEY);
import logger from "./logger";

async function createToken(){
  try {
    const { id } = await gateway.tokens.create({
      card: {
        "number": '4242424242424242',
        "exp_month": 12,
        "exp_year": 2017,
        "cvc": '123'
      }
    });
  return id
  }
  catch (err) {
    logger.error(err)
  }
}

const { id } = createToken();


export function donation(data) {
  console.log(data);
  return new Promise(async(resolve, reject) => {
    try {
      const { token, donor, donation } = data;
      const customer = await gateway.customers.create({
        source: data.stripeToken,
        description: donor.email
      })
      if (customer.id) {
        const charge = await gateway.charges.create({
          currency: "usd",
          customer: customer.id,
          amount: (donation.amount || 5000)
        });
        resolve({
          customer, // amount, ...
          charge
        })
      }
      else {
        reject({
          message: "Problem creating customer", // amount, ...
        })
      }
    }
    catch (err) {
      reject(err)
    }
  })

}

export async function membership(data) {
  return {

  }
}

export async function getPlans() {
  const { data } = await gateway.plans.list()
  return data;
}

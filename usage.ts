import XellarSDK from './src';

const x = new XellarSDK(
  'ey64818077eabd4488089empca1bf8bea4256',
  'https://mpc-dev.xellar.co',
);

const main = async () => {
  const response1 = await x.auth.username.login(
    'kucingmujaer2',
    'kucingmujaer2',
  );
  console.log({ response1 });
  const response2 = await x.auth.username.login(
    'kucingmujaer2',
    'kucingmujaer2',
  );
  console.log({ response2 });
};

main();

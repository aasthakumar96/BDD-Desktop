import PropTypes from 'prop-types';
import {
  Picker,
  Item,
  Flex,
  Heading,
  Button,
  ProgressCircle,
  Text,
  Divider,
} from '@adobe/react-spectrum';
import { useAsyncList } from '@react-stately/data';
import React from 'react';

const AvailableBuilds = (props: { product: any; singleItem: any }) => {
  const { product, singleItem } = props;
  const locales = singleItem.locales.split(',');
  const [locale, setLocale] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(false);

  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const startDate = date.toLocaleDateString('en-ZA');
  const endDate = new Date().toLocaleDateString('en-ZA');
  // console.log(startDate);
  // console.log(endDate);
  // console.log(locales);

  const list = useAsyncList({
    async load({ signal }) {
      const res = await fetch(
        `http://codex.corp.adobe.com/codex/rest/builds?productname=${singleItem.productName}&subproductname=${singleItem.subProduct}&platformname=${singleItem.platform}&formatname=${singleItem.type}&certlevel=Not Tested&date=${startDate}<x<${endDate}`, // &versionname=${singleItem.version}
        { signal }
      );
      const recjson = await res.json();

      return { items: recjson.build.splice(0, 5) };
    },
  });

  const productInstall = () => {
    console.log('in product  install');
    setisLoading(true);
    window.electron.ipcRenderer.send('install', 'hello new api');

    window.electron.ipcRenderer.once('install', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      setisLoading(false);
      // setTimeout(() => {
      //   setisLoading(false);
      // }, 5000);
    });
  };

  return (
    <>
      <Flex
        direction="row"
        gap="size-100"
        alignContent="center"
        margin="size-300"
        marginBottom="size-0"
        alignItems="center"
      >
        <Heading level={5} margin="size-0">
          Build :
        </Heading>

        <Picker
          items={list.items}
          isQuiet
          isLoading={list.isLoading}
          maxWidth="size-1800"
          menuWidth="size-1600"
        >
          {(item) => (
            <Item key={item.locations.location[0].buildid}>{item.build}</Item>
          )}
        </Picker>
      </Flex>
      <Flex
        direction="row"
        gap="size-100"
        alignContent="center"
        margin="size-300"
        marginTop="size-40"
        alignItems="center"
      >
        <Heading level={5} margin="size-0">
          Locale :
        </Heading>

        <Picker
          selectedKey={locale}
          onSelectionChange={(selected) => setLocale(selected)}
          isQuiet
          maxWidth="size-1200"
          menuWidth="size-1200"
        >
          {locales !== []
            ? locales.map((loc) => <Item key={loc}>{loc}</Item>)
            : null}
        </Picker>
      </Flex>
      <Divider size="M" margin="size-100" />
      <Flex
        direction="row"
        margin="size-100"
        alignContent="center"
        justifyContent="end"
      >
        {isLoading ? (
          <ProgressCircle aria-label="Loading…" isIndeterminate />
        ) : (
          <Button variant="primary" onPress={() => productInstall()}>
            <Text>Install</Text>
          </Button>
        )}
      </Flex>
    </>
  );
};

export default AvailableBuilds;

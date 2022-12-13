import {
  Flex,
  Grid,
  repeat,
  View,
  Image,
  Heading,
  Divider,
  Button,
  Text,
  Item,
  Picker,
  Content,
  IllustratedMessage,
  ProgressCircle,
} from '@adobe/react-spectrum';
import React, { useEffect } from 'react';
import DeviceDesktop from '@spectrum-icons/workflow/DeviceDesktop';
import { useAsyncList } from '@react-stately/data';
import PropTypes from 'prop-types';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import styles from '../../App.module.css';
import AvailableBuilds from './AvailableBuilds';

const AvailableProducts = (props) => {
  const { searchValue } = props;
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setfilteredProducts] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(false);

  const list = useAsyncList({
    async load({ signal }) {
      const res = await fetch(
        'https://odin-java-stage.corp.adobe.com:8443/odin/installer',
        {
          signal,
          headers: {
            Authorization:
              'mgvlUej0qUarOv32acTQtv4G8ZLNoxlIVJPorlWyntatpW0ePlwjxXzqtk4gEkr2fQb5jMviN8r5yhnoY3Gidg==',
            accept: '*/*',
          },
        }
      );
      const json = await res.json();
      setProducts(json);
      setfilteredProducts(json);
      // console.log(json);
      return { items: json };
    },
  });

  useEffect(() => {
    if (searchValue.trim() === '') {
      setfilteredProducts(products);
    } else {
      setfilteredProducts(
        products.filter((product) => {
          return product.productName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        })
      );
    }
  }, [products, searchValue]);
  // } else {
  //   setfilteredProducts(
  //     products.filter((product) => {
  //       return product.name.toLowerCase().includes(searchValue.toLowerCase());
  //     })
  //   );
  // }

  const productInstall = () => {
    console.log('in product  install');
    setisLoading(true);
    window.electron.ipcRenderer.send('install', 'hello new api');

    window.electron.ipcRenderer.once('install', (arg) => {
      // eslint-disable-next-line no-console
      console.log('In index.tsx - install');
      console.log(arg);
      setisLoading(false);
    });
  };

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <IllustratedMessage>
          {/* <NotFound /> */}
          <Heading>No results</Heading>
          {/* <Content>Try another search</Content> */}
        </IllustratedMessage>
      ) : (
        <Grid
          columns={repeat('auto-fit', 'size-3600')}
          justifyContent="center"
          autoRows="size-2800"
          gap="size-300"
        >
          {filteredProducts.map((product) => {
            return (
              <View
                key={product.productName + product.version}
                backgroundColor="gray-50"
                borderWidth="thin"
                borderColor="light"
                borderRadius="medium"
              >
                <Flex
                  direction="row"
                  flexBasis="auto"
                  gap="size-100"
                  alignContent="center"
                  margin="size-300"
                  marginBottom="size-100"
                  marginTop="size-300"
                >
                  <View flexGrow={1} marginEnd="size-0" maxWidth="50px">
                    <Flex width="50px" height="50px" marginEnd="size-0">
                      <Image
                        src="https://i.imgur.com/c3gTKSJ.jpg"
                        alt="Eiffel Tower at sunset"
                        objectFit="cover"
                      />
                    </Flex>
                  </View>
                  <View flexGrow={2} justifySelf="left" alignSelf="center">
                    <Flex direction="column" margin="size-0">
                      <Heading level={4} margin="size-0">
                        {product.productName}
                      </Heading>
                      <Heading level={5} margin="size-0">
                        Version : {product.version}
                      </Heading>
                    </Flex>
                  </View>
                  <View flexGrow={1} alignSelf="center">
                    <Flex justifyContent="right">
                      <DeviceDesktop UNSAFE_className={styles.deviceIcon} />
                    </Flex>
                  </View>
                </Flex>
                <AvailableBuilds product={list.items} singleItem={product} />
              </View>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

AvailableProducts.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default AvailableProducts;

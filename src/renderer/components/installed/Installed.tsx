/* eslint-disable react/no-children-prop */
/* eslint-disable react/self-closing-comp */
import {
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  useAsyncList,
  Content,
  Heading,
  IllustratedMessage,
  View,
} from '@adobe/react-spectrum';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NoSearchResults from '@spectrum-icons/illustrations/NoSearchResults';

const Installed = (props) => {
  const { searchValue } = props;
  const [products, setProducts] = React.useState([]);

  const columns = [
    { name: 'Product Name', key: 'productName' },
    { name: 'Version', key: 'version' },
    { name: 'Build No', key: 'buildNo' },
    { name: 'Locales', key: 'locales' },
  ];

  const list = useAsyncList({
    async load({ signal }) {
      const res = await fetch(
        'https://odin-java-stage.corp.adobe.com:8443/odin/installer',
        {
          signal,
          headers: {
            "Authorization":
              'mgvlUej0qUarOv32acTQtv4G8ZLNoxlIVJPorlWyntatpW0ePlwjxXzqtk4gEkr2fQb5jMviN8r5yhnoY3Gidg==',
            "accept": '*/*',
          },
        }
      );
       const json = await res.json();
      //  console.log(json);
      setProducts(json);
      // console.log(products);
      return {
        items: json,
      };
    },
  });

  useEffect(() => {
    if (list !== undefined) {
      if (searchValue.trim() === '') {
        // console.log(products);
        list.setSelectedKeys('all');
        list.removeSelectedItems();
        products.map((product) => list.append(product));
      } else {
        list.setSelectedKeys('all');
        list.removeSelectedItems();
        // console.log('in else');
        products
          .filter((product) => {
            return product.productName
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((product) => list.append(product));
      }
    }
  }, [searchValue]);

  return (
    <div>
      {list.items.length === 0 ? (
        <View alignSelf="center">
          <IllustratedMessage>
            <NoSearchResults />
            <Heading>No matching results</Heading>
            <Content>Try another search.</Content>
          </IllustratedMessage>
        </View>
      ) : (
        <TableView
          aria-label="Example table with static contents"
          overflowMode="wrap"
          height="size-3000"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <Column
                align={column.key !== 'productName' ? 'end' : 'start'}
              >{column.name}</Column>
            )}
          </TableHeader>
          <TableBody items={list.items} loadingState={list.loadingState}>
            {(item) => (
              <Row key={item.productName}>{(key) => <Cell>{item[key]}</Cell>}</Row>
            )}
          </TableBody>
        </TableView>
      )}
    </div>
  );
};

Installed.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default Installed;

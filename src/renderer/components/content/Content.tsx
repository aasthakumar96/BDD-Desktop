import React from 'react';
import { Divider } from '@react-spectrum/divider';
import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Heading } from '@adobe/react-spectrum';
import AvailableProducts from '../availableProducts/AvailableProducts';
import Installed from '../installed/Installed';

type Props = {
  header: string;
  searchParameter: string;
};

function Content(props: Props) {
  const { header, searchParameter } = props;
  return (
    <>
      <View
        backgroundColor="static-gray-50"
        height="size-675"
        minWidth="size-900"
      >
        <Flex
          direction="row"
          alignItems="center"
          marginStart="size-300"
          height="size-600"
        >
          <Heading level={4}>{header}</Heading>
        </Flex>
      </View>
      <Divider size="S" />
      {/* Code below this should be rendered based on  nav  click */}
      <View
      // backgroundColor="static-gray-200"
      >
        <Flex
          direction="column"
          gap="size-100"
          flexBasis="auto"
          marginStart="size-350"
          marginEnd="size-350"
        >
          <h4 style={{ marginBottom: '0px' }}>Installed</h4>
          <View flexGrow={1} minHeight="size-3000">
            <Installed searchValue={searchParameter} />
          </View>
          <h4>Available for Installation</h4>
          <View flexGrow={1} minHeight="size-3000" marginBottom="size-200">
            <AvailableProducts searchValue={searchParameter} />
          </View>
        </Flex>
      </View>
    </>
  );
}

export default Content;

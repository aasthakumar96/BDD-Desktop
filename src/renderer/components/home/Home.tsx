/* eslint-disable jsx-a11y/anchor-is-valid */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import {
  Link,
  defaultTheme,
  Divider,
  Flex,
  Grid,
  Provider,
  SearchField,
  View,
  Item,
  ListBox,
  Text,
  ActionButton,
  Dialog,
  DialogTrigger,
  Heading,
  Content,
  Button,
  ButtonGroup,
  Checkbox,
  Form,
  TextField,
  Header,
} from '@adobe/react-spectrum';
import Refresh from '@spectrum-icons/workflow/Refresh';
import Bell from '@spectrum-icons/workflow/Bell';
import Apps from '@spectrum-icons/workflow/Apps';
import Close from '@spectrum-icons/workflow/Close';
import CheckMarkCircleOutline from '@spectrum-icons/workflow/CheckmarkCircleOutline';
import RealTimeCustomerProfile from '@spectrum-icons/workflow/RealTimeCustomerProfile';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useButton } from '@react-aria/button';
import styles from '../../App.module.css';
import AppContent from '../content/Content';

const Home = () => {
  const [contentHeader, setContentHeader] = React.useState('All Test Apps');
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <Grid
      areas={{
        base: ['header', 'nav', 'content'],
        M: [
          'header   header',
          'nav      content',
          'nav      content',
          'nav      content',
        ],
        L: [
          'header header   header',
          'nav    content  content',
          'nav    content  content',
          'nav    content  content',
          'nav    content  content',
        ],
        XL: [
          'header header   header',
          'nav    content  content',
          'nav    content  content',
          'nav    content  content',
          'nav    content  content',
          'nav    content  content',
          'nav    content  content',
        ],
      }}
      columns={{
        M: ['size-2000', '1fr'],
        L: ['size-3000', '1fr', 'size-3000'],
        XL: ['size-3000', '1fr', 'size-3000'],
      }}
      gap="size-50"
    >
      <View
        gridArea="header"
        height="size-1000"
        maxHeight="size-1000"
        backgroundColor="gray-50"
        UNSAFE_className={styles.titleBar}
        zIndex={100}
        position="sticky"
        top="size-0"
      >
        <Flex
          direction={{ base: 'column', M: 'row' }}
          height="size-1000"
          flexBasis="auto"
          alignItems="center"
          justifyContent="center"
        >
          <View
            flexGrow={1}
            marginStart="size-100"
            UNSAFE_className={styles.noDrag}
          >
            <Link>Help</Link>
          </View>
          <View flexGrow={3} UNSAFE_className={styles.noDrag}>
            <Flex direction="row" justifyContent="center">
              <SearchField
                label="Search Products"
                labelPosition="side"
                labelAlign="end"
                width="size-5000"
                value={searchValue}
                onChange={setSearchValue}
              />
            </Flex>
          </View>
          <View flexGrow={1} UNSAFE_className={styles.noDrag}>
            <Flex
              direction={{ base: 'row', M: 'row' }}
              flexBasis="auto"
              alignItems="center"
              justifyContent="right"
              gap="size-100"
              marginEnd="size-200"
            >
              <View>
                <ActionButton isQuiet>
                  <Refresh aria-label="Refresh" />
                </ActionButton>
              </View>
              <View>
                <DialogTrigger type="popover">
                  <ActionButton isQuiet>
                    <Bell aria-label="Notifications" />
                  </ActionButton>
                  <Dialog size="S">
                    <Heading>Notifications</Heading>
                    <Divider />
                    <Content>
                      <Text>No new notifications</Text>
                    </Content>
                  </Dialog>
                </DialogTrigger>
              </View>
              <View>
                <DialogTrigger type="popover">
                  <ActionButton isQuiet>
                    <RealTimeCustomerProfile aria-label="Profile" />
                  </ActionButton>
                  <Dialog>
                    <Heading>
                      <Flex direction="column">
                        <Heading>Username</Heading>
                        <Heading>user@adobe.com</Heading>
                      </Flex>
                    </Heading>

                    <Divider />

                    <Content>
                      <DialogTrigger type="fullscreenTakeover">
                        <ActionButton marginTop="size-10">
                          Sign Out
                        </ActionButton>
                        {(close) => (
                          <Dialog>
                            <Heading>Login</Heading>
                            <Divider />
                            <Content>
                              <Form>
                                <TextField label="Username" />
                                <TextField label="Password" />
                              </Form>
                            </Content>
                            <ButtonGroup>
                              <Button variant="cta" onPress={close} autoFocus>
                                Login
                              </Button>
                            </ButtonGroup>
                          </Dialog>
                        )}
                      </DialogTrigger>
                    </Content>
                  </Dialog>
                </DialogTrigger>
              </View>
            </Flex>
          </View>
        </Flex>
        <Divider size="S" />
      </View>
      <View
        gridArea="nav"
        backgroundColor="gray-50"
        position="fixed"
        height="100%"
        width="size-3000"
        top="size-1000"
      >
        <Flex direction={{ base: 'row', M: 'column' }}>
          <View height="size-800" minWidth="size-3000" marginStart="size-10">
            <Heading margin="size-300">APPS</Heading>
          </View>
          <Divider size="S" marginTop="size-25" />
          <ListBox
            selectionMode="single"
            onSelectionChange={(selected) => setContentHeader(selected)}
            width="size-3000"
            margin="size-0"
            defaultSelectedKeys={['All Test Apps']}
          >
            <Item textValue="All Test Apps" key="All Test Apps">
              <Apps margin="size-10" />
              <Text>All Test Apps</Text>
            </Item>
            <Item textValue="GM Apps" key="GM Apps">
              <CheckMarkCircleOutline aria-label="GM" margin="size-10" />
              <Text>GM Apps</Text>
            </Item>
          </ListBox>
        </Flex>
      </View>
      <View gridArea="content" minHeight="size-6000">
        <AppContent header={contentHeader} searchParameter={searchValue} />
      </View>
    </Grid>
  );
};

export default Home;

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </Router>
//   );
// }

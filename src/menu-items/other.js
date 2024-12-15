// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  NotificationOutlined,
  FileTextOutlined ,
  PayCircleOutlined,
  BookOutlined,
  DashboardOutlined,
  BorderOutlined,
  BoxPlotOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SmileOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  NotificationOutlined,
  FileTextOutlined ,
  PayCircleOutlined,
  BookOutlined,
  DashboardOutlined,
  ChromeOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  GatewayOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const Main = {
  id: 'Main',
  title: <FormattedMessage id="Main" />,
  type: 'group',
  children: [
    {
      id: 'Dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'Institutions',
      title: <FormattedMessage id="Institutions" />,
      type: 'item',
      url: '/institutions',
      icon: icons.BookOutlined,
      // chip: {
      //   label: 'gitbook',
      //   color: 'secondary',
      //   size: 'small'
      // }
    },
    {
      id: 'Fees',
      title: <FormattedMessage id="Fees" />,
      type: 'item',
      url: 'https://links.codedthemes.com/RXnKQ',
      icon: icons.PayCircleOutlined,
      external: true,
      target: true
    },
    {
      id: 'Loans',
      title: <FormattedMessage id="Loans" />,
      type: 'item',
      url: 'https://links.codedthemes.com/RXnKQ',
      icon: icons.FileTextOutlined,
      external: true,
      target: true
    },
    {
      id: 'Anouncements',
      title: <FormattedMessage id="Anouncements" />,
      type: 'item',
      url: 'https://links.codedthemes.com/RXnKQ',
      icon: icons.NotificationOutlined,
      external: true,
      target: true
    },
  ]
};

export default Main;

import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => {
  return {
    main: {
      maxWidth: 1400,
      margin: '0 auto',
      padding: 50
    },
    actions: {
      display: 'flex',
      '& li': {
        display: 'flex',
        margin: [0, 10, 10, 0],
        '& button': {
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          '&.view-button': {
            color: '#009688',
            '&:hover': {
              color: '#94C720'
            }
          },
          '&.delete-button': {
            color: '#C70D38',
            '&:hover': {
              opacity: 0.7
            }
          },
          '& span': {
            marginRight: 5
          }
        }
      }
    }
  };
});

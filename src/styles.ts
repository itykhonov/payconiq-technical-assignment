import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      outline: 'none'
    },
    body: {
      margin: 0,
      fontFamily: 'Roboto, sans-serif',
      fontSize: 16,
      lineHeight: '20px',
      color: '#404040',
      background: 'hsl(0, 0%, 98%)',
      minWidth: 700
    },
    p: {
      marginBottom: 10
    },
    ul: {
      listStyle: 'none'
    },
    h1: {
      fontSize: 48,
      lineHeight: '50px',
      marginBottom: 30
    },
    h2: {
      fontSize: 24,
      lineHeight: '28px',
      marginBottom: 25
    },
    input: {},
    'input::placeholder': {
      color: '#C5CBD8'
    },
    a: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    dl: {
      overflow: 'hidden',
      '& dt': {
        fontWeight: 800,
        float: 'left',
        margin: [0, 5, 10, 0]
      },
      '& dd': {
        overflow: 'hidden',
        margin: [0, 0, 10, 0]
      }
    },
    button: {
      padding: 10,
      border: 'none',
      cursor: 'pointer',
      color: '#404040',
      background: 'none',
      fontFamily: 'Roboto, sans-serif'
    },
    table: {
      border: 'solid #8d8d8d',
      borderWidth: [1, 1, 0, 1],
      textAlign: 'left',
      background: '#fff',
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)',
      '& th': {
        color: '#8d8d8d',
        padding: 10,
        borderBottom: '1px solid #8d8d8d'
      },
      '& td': {
        padding: 10,
        borderBottom: '1px solid #8d8d8d'
      }
    }
  },
  wrapper: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: [0, 50]
  },
  header: {
    background: '#fff',
    boxShadow: '0 0 3px 2px rgb(0, 0, 0, 0.2)'
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerHolder: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    marginRight: 30,
    color: '#404040',
    fontSize: 24,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
      opacity: 0.8
    }
  },
  nav: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    '& ul': {
      display: 'flex',
      alignItems: 'center'
    },
    '& a': {
      color: '#8d8d8d',
      display: 'block',
      padding: [20, 15, 15],
      borderBottom: '2px solid transparent',
      '&:hover': {
        color: '#404040',
        borderColor: '#009688',
        textDecoration: 'none'
      },
      '&.active': {
        color: '#404040',
        borderColor: '#009688'
      }
    }
  },
  logoutButton: {
    padding: 0,
    textTransform: 'uppercase',
    color: '#009688',
    fontWeight: '700',
    '&:hover': {
      color: '#94c720'
    }
  }
});

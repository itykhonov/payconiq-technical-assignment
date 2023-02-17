import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => {
  return {
    main: {
      maxWidth: 1400,
      margin: '0 auto',
      padding: 50
    },
    converter: {
      marginBottom: 30
    },
    converterHolder: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 40,
      '& .change-symbols-button': {
        color: '#009688',
        width: 50,
        height: 50,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 2px -3px rgba(0,0,0,0.2)',
        cursor: 'pointer'
      }
    },
    inputHolder: {
      display: 'flex',
      flexDirection: 'column',
      margin: [0, 5],
      '& label': {
        display: 'inline-block',
        verticalAlign: 'top',
        color: '#8d8d8d',
        marginBottom: 10,
        fontSize: 14
      },
      '&>input': {
        border: 'none',
        boxShadow: '0 4px 2px -3px rgba(0,0,0,0.2)',
        padding: [9, 5],
        fontSize: 16,
        lineHeight: 20,
        height: 38,
        width: '100%',
        background: 'none'
      },
      '& .select': {
        '& input': {
          border: 'none',
          padding: 5,
          fontSize: 16,
          lineHeight: 28,
          height: 28,
          width: '100%',
          background: 'none'
        },
        '&>div': {
          background: 'hsl(0, 0%, 98%)',
          border: 'none !important',
          boxShadow: '0 4px 2px -3px rgba(0,0,0,0.2) !important',
          borderRadius: 0,
          '&>div+div': {
            display: 'none'
          }
        }
      }
    },
    convertButton: {
      textTransform: 'uppercase',
      color: '#fff',
      padding: 10,
      background: '#009688',
      cursor: 'pointer',
      boxShadow: '0 4px 2px -3px rgba(0,0,0,0.2)',
      '&:hover': {
        background: '#94c720'
      },
      '&:disabled': {
        cursor: 'default',
        background: 'grey !important'
      }
    },
    convertedResult: {
      boxShadow: '0 2px 2px -1px rgba(0,0,0,0.2)',
      textAlign: 'center',
      paddingBottom: 40,
      '& .result': {
        fontSize: 50,
        lineHeight: '50px',
        marginBottom: 20,
        '& span': {
          margin: 5,
          '& b': {
            color: '#94c720'
          }
        }
      },
      '& .currency-list': {
        '& span': {
          margin: [0, 2]
        }
      }
    },
    history: {
      marginBottom: 20
    },
    historyHolder: {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    switcher: {
      display: 'flex',
      '& li': {
        position: 'relative',
        margin: [0, 5],
        overflow: 'hidden',
        '& input': {
          position: 'absolute',
          height: 0,
          width: 0,
          top: 0,
          left: 0,
          visibility: 'hidden',
          '&:checked + label:before': {
            display: 'block'
          }
        },
        '& label': {
          position: 'relative',
          paddingLeft: 20,
          '&::after': {
            content: "''",
            position: 'absolute',
            width: 10,
            height: 10,
            top: '50%',
            left: 0,
            borderRadius: 10,
            transform: 'translateY(-50%)',
            border: '1px solid #009688'
          },
          '&:before': {
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: 8,
            top: '50%',
            left: 2,
            transform: 'translateY(-50%)',
            background: '#009688',
            content: "''",
            display: 'none'
          }
        }
      }
    },
    historyTableHoder: {
      display: 'flex',
      justifyContent: 'space-between',
      '& .column': {
        width: '49%'
      }
    }
  };
});

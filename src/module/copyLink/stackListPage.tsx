import { Typography, Link, GridList, GridListTile, Card } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

import CircularProgressOverlay from '../../components/circular-progress-overlay';

const useStyles = makeStyles(() => ({
  resourceCardIconStyle: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.4rem',
    cursor: 'pointer'
  },
  fieldsWrapper: {
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#AFD3F7'
    }
  },
  detailsCardWrapper: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#FFFFFF',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '10px',
    height: '100%'
  },
  gridListItem: {
    width: '100%',
    height: '4rem'
  },
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexWrap: 'nowrap',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4rem'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#AFD3F7'
    }
  },
  tileStyling: {
    display: 'flex',
    justifyContent: 'center'
  },
  resourceCardStyle: {
    position: 'absolute',
    paddingTop: '0.5rem',
    height: '98%',
    width: '98%'
  },
  resourceHeading: {
    display: 'inline',
    fontSize: '0.9rem',
    fontWeight: 800,
    color: '#323648',
    opacity: 1
  },
  fieldStyle: {
    marginTop: '0.4rem',
    marginBottom: '0.2rem'
  }
}));

const StackListViewPage: React.FC<any> = (props: any) => {
  const classes = useStyles();

  const params: any = new URLSearchParams(props.location.search);

  const [data, setData] = React.useState([]) as any;
  const [id, setId] = React.useState(params.get('id')) as any;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchStackList();
  }, []);

  async function fetchStackList() {
    try {
      setLoading(true);
      // const response = await fetch(`http://10.71.71.115:6060/api/v1/stack/${id}`, {
      //   method: 'GET'
      // });
      const response = await fetch(`https://dev.carenav.vituity.com/api/v1/stack/${id}`, {
        method: 'GET'
      });

      const json = await response.json();
      console.log('>>>>>>Json>>', json);
      setData(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div>
        <CircularProgressOverlay />
      </div>
    );
  } else {
    return (
      <div className={classes.detailsCardWrapper}>
        <div
          style={{
            width: '100%',
            padding: '0.5rem',
            height: '80vh'
          }}>
          <div id="gridList" className={classes.gridList}>
            {data.length === 0 || data === null ? (
              <Typography style={{ fontWeight: 800 }}>No Resources In Stack</Typography>
            ) : (
              <>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  Resources in Stack
                </Typography>
                <div style={{ marginTop: '30px' }}>
                  {data.map((resource: any) => {
                    return (
                      <div style={{ width: '100%' }} key={resource.name}>
                        <div
                          style={{
                            borderBottom: '0.1px solid black',
                            marginBottom: '1rem'
                          }}>
                          {/* <div style={{ display: 'block' }} className={classes.fieldStyle}>
                        <Typography className={classes.resourceHeading}>{resource.name}</Typography>
                        <Link
                            style={{ float: 'right', marginRight: '5px' }}
                            onClick={() => removeResourceFromStack(resource.name)}>
                            Remove
                        </Link>
                        </div>
                        */}
                          <Typography className={classes.resourceHeading}>
                            {resource.name}
                          </Typography>
                          <Typography className={classes.fieldStyle}>{resource.address}</Typography>
                          <Typography className={classes.fieldStyle}>{resource.phoneNo}</Typography>
                          <Typography style={{ color: '#007EFF' }} className={classes.fieldStyle}>
                            {resource.infoFound}
                          </Typography>
                          <Typography className={classes.fieldStyle}>
                            {resource.workingHrs}
                          </Typography>
                          {resource.comments && <Typography>{resource.comments}</Typography>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default StackListViewPage;

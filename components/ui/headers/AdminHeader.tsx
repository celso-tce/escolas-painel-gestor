import React from 'react';

type AdminHeaderProps = {};

const AdminHeader: React.FC<AdminHeaderProps> = (props) => {
  return (
    <>
      <div className="relative bg-tce-blue-4 md:pt-32 pb-16 pt-12">
        {/* <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            ...
          </div>
        </div> */}
      </div>
    </>
  );
};

export default React.memo(AdminHeader);

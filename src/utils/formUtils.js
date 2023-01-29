export const formValidation = (form, error) => {
  const { field, message } = error.response.data;
  form.setFields([{
      name:field,
      errors: [ message ],
    },
  ]);
};

export const onFormFinish = (form, action) => {
  if(form.getFieldsError().every(item => item.errors.length === 0)) {
    action();
  }
};



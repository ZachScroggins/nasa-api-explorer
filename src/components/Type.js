import { styled } from '@material-ui/core/styles';
import { compose, palette, spacing, typography } from '@material-ui/system';
import { Typography } from '@material-ui/core';

export const Type = styled(Typography)(compose(palette, spacing, typography));

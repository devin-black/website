import { Box, Shelf, Grid, Text, Stack, TextWithPlaceholder, Placeholder } from '@centrifuge/fabric'
import React from 'react'
import { useTheme } from 'styled-components'
import { Anchor } from './styles'

export type NewsCardProps = MediaProps &
  ReadMoreProps & {
    label: string
    title: string
    body: string
    boxed?: boolean
    featured?: boolean
    isLoading?: boolean
  }

export function NewsCard({
  label,
  title,
  body,
  image,
  href,
  boxed = false,
  featured = false,
  isLoading = false,
}: NewsCardProps) {
  const { shadows } = useTheme()

  return featured ? (
    <Box>
      <Label isLoading={isLoading}>{label}</Label>
      <Grid gridTemplateColumns={['1fr', '1fr', 'repeat(2, minmax(0, 1fr))']} gap={[2, 2, 4]} mt={[1, 1, 2]}>
        <Media image={image} order={[1, 1, 2]} isLoading={isLoading} />

        <Stack gap={2} order={[2, 2, 1]}>
          <Title featured={featured} isLoading={isLoading}>
            {title}
          </Title>
          <Body featured={featured} isLoading={isLoading}>
            {body}
          </Body>
          <ReadMore href={href} boxed={false} />
        </Stack>
      </Grid>
    </Box>
  ) : (
    <Shelf
      as="article"
      position="relative"
      minHeight="100%"
      p={boxed ? 2 : 0}
      flexDirection="column"
      alignItems="start"
      borderWidth={boxed ? 1 : 0}
      borderStyle="solid"
      borderColor="borderPrimary"
      borderRadius={boxed ? 'input' : 0}
      style={{
        boxShadow: boxed ? shadows.cardInteractive : 'none',
      }}
    >
      <Label isLoading={isLoading}>{label}</Label>

      <Media image={image} isLoading={isLoading} />

      <Shelf mt={2} gap={1} flexDirection="column" alignItems="start" flexGrow={2}>
        <Title featured={featured} isLoading={isLoading}>
          {title}
        </Title>
        <Body featured={featured} isLoading={isLoading}>
          {body}
        </Body>

        <Box mt="auto" pt={boxed ? 0 : 1}>
          <ReadMore href={href} boxed={boxed} />
        </Box>
      </Shelf>
    </Shelf>
  )
}

function Label({ children, isLoading = false }: { children: React.ReactNode; isLoading?: boolean }) {
  return (
    <TextWithPlaceholder
      as="span"
      variant="body3"
      color="textSecondary"
      isLoading={isLoading}
      style={{
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </TextWithPlaceholder>
  )
}

function Title({
  featured = false,
  children,
  isLoading = false,
}: {
  featured: boolean
  children: React.ReactNode
  isLoading?: boolean
}) {
  return (
    <TextWithPlaceholder as="h2" variant={featured ? 'heading5' : 'heading4'} isLoading={isLoading}>
      {children}
    </TextWithPlaceholder>
  )
}

function Body({
  featured = false,
  children,
  isLoading = false,
}: {
  featured: boolean
  children: React.ReactNode
  isLoading?: boolean
}) {
  return (
    <TextWithPlaceholder as={isLoading ? 'div' : 'p'} variant={featured ? 'body1' : 'body2'} isLoading={isLoading}>
      {children}
    </TextWithPlaceholder>
  )
}

type ReadMoreProps = {
  href: string
  boxed?: boolean
}

function ReadMore({ href, boxed = false }: ReadMoreProps) {
  return (
    <Anchor
      as="a"
      href={href}
      title={boxed ? 'Read more…' : ''}
      target="_blank"
      rel="noopener noreferrer"
      boxed={boxed}
    >
      {!boxed && (
        <Text as="span" variant="body1" color="textSecondary" underline>
          'Read more…'
        </Text>
      )}
    </Anchor>
  )
}

type MediaProps = { image?: string }

function Media({
  image,
  order = 0,
  isLoading = false,
}: MediaProps & { order?: number | number[]; isLoading?: boolean }) {
  return (
    <Box
      as={isLoading || !image ? Placeholder : 'img'}
      src={image}
      alt=""
      order={order}
      aspectRatio="1.88 / 1" // 1024:545 medium article thumbnail ratio
      display="block"
      width="100%"
      mt={1}
      style={{ objectFit: 'cover' }}
    />
  )
}

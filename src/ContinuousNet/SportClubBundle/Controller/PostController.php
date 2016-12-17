<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\Post;
use ContinuousNet\SportClubBundle\Form\PostType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Post Controller
 * 
 * Manage Posts 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\SportClubBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Controller
 * @see		PostController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/post")
 */
class PostController extends BaseController
{
	/**
	 * Lists all Post entities.
	 *
	 * @Route("/", name="post_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$posts = $em->getRepository('SportClubBundle:Post')->findAll();

		return $this->render('SportClubBundle:Post:index.html.twig', array(
			'posts' => $posts,
		));
	}

	/**
	 * Creates a new Post entity.
	 *
	 * @Route("/new", name="post_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$post = new Post();
		$form = $this->createForm('ContinuousNet\SportClubBundle\Form\PostType', $post);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($post);
			$em->flush();

			return $this->redirectToRoute('post_show', array('id' => $post->getId()));
		}

		return $this->render('SportClubBundle:Post:new.html.twig', array(
			'post' => $post,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Post entity.
	 *
	 * @Route("/{id}", name="post_show")
	 * @Method("GET")
	 */
	public function showAction(Post $post)
	{
		$deleteForm = $this->createDeleteForm($post);

		return $this->render('SportClubBundle:Post:show.html.twig', array(
			'post' => $post,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Post entity.
	 *
	 * @Route("/{id}/edit", name="post_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Post $post)
	{
		$deleteForm = $this->createDeleteForm($post);
		$editForm = $this->createForm('ContinuousNet\SportClubBundle\Form\PostType', $post);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($post);
			$em->flush();

			return $this->redirectToRoute('post_edit', array('id' => $post->getId()));
		}

		return $this->render('SportClubBundle:Post:edit.html.twig', array(
			'post' => $post,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Post entity.
	 *
	 * @Route("/{id}", name="post_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Post $post)
	{
		$form = $this->createDeleteForm($post);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($post);
			$em->flush();
		}

		return $this->redirectToRoute('post_index');
	}

	/**
	 * Creates a form to delete a Post entity.
	 *
	 * @param Post $post The Post entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Post $post)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('post_delete', array('id' => $post->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
